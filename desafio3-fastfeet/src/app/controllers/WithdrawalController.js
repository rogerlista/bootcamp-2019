import { Op } from 'sequelize'
import { startOfDay, endOfDay, getHours } from 'date-fns'

import Recipient from '../models/Recipient'
import Order from '../models/Order'

class WithdrawalController {
  async update(req, res) {
    const { order_id, deliveryman_id } = req.params
    const withdrawalDate = new Date()
    const withdrawalTime = getHours(withdrawalDate)

    if (withdrawalTime < 8 || withdrawalTime >= 18) {
      return res
        .status(400)
        .json({ error: 'Withdrawals are only allowed from 8am to 6pm.' })
    }

    const totalOrders = await Order.count({
      where: {
        deliveryman_id: deliveryman_id,
        canceled_at: null,
        start_date: {
          [Op.between]: [startOfDay(withdrawalDate), endOfDay(withdrawalDate)],
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
      order.start_date = withdrawalDate
      order.save()
    }

    return res.json(order)
  }
}

export default new WithdrawalController()
