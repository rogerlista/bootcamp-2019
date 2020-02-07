import { Op } from 'sequelize'
import * as Yup from 'yup'

import Recipient from '../models/Recipient'
import Order from '../models/Order'

class HandedOutController {
  async index(req, res) {
    const handedOut = await Order.findAll({
      where: {
        end_date: {
          [Op.ne]: null,
        },
      },
      attributes: ['id', 'product', 'start_date', 'end_date'],
      order: ['end_date'],
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

    return res.json(handedOut)
  }

  async update(req, res) {
    const schema = Yup.object.shape({
      end_date: Yup.date().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const order = await Order.findOne({
      where: {
        id: req.params.order_id,
        deliveryman_id: req.params.deliveryman_id,
        start_date: { [Op.ne]: null },
      },
    })

    if (!order) {
      return res.status(400).json('Order not found')
    }

    if (!order.end_date) {
      order.end_date = req.body.end_date
      order.signature_id = req.body.signature_id
      order.save()
    }

    return res.json(order)
  }
}

export default new HandedOutController()
