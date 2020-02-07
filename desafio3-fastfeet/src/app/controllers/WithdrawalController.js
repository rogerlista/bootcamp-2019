import { Op } from 'sequelize'
import * as Yup from 'yup'
import { startOfDay, endOfDay, parseISO } from 'date-fns'

import Recipient from '../models/Recipient'
import Order from '../models/Order'

class WithdrawalController {
  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const { order_id, deliveryman_id } = req.params
    const { start_date } = req.body
    const parsedDate = parseISO(start_date)

    const totalOrders = await Order.count({
      where: {
        deliveryman_id: deliveryman_id,
        canceled_at: null,
        start_date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
    })

    if (totalOrders > 5) {
      return res.status(400).json({
        error: 'Deliveryman your deliveries exceed the limit of 5 per day.',
      })
    }

    const order = await Order.findOne({
      where: {
        id: order_id,
        start_date: null,
        canceled_at: null,
        end_date: null,
        deliveryman_id: deliveryman_id,
      },
      attributes: ['id', 'product'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'city',
            'state',
            'zip_code',
          ],
        },
      ],
    })

    if (!order) {
      return res.status(400).json({ error: 'Order not found.' })
    }

    if (!order.start_date) {
      order.start_date = parsedDate
      order.save()
    }

    return res.json(order)
  }
}

export default new WithdrawalController()
