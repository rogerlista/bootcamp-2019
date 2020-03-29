import { Op } from 'sequelize'

import Recipient from '../models/Recipient'
import Order from '../models/Order'

class HandedOutController {
  async index(req, res) {
    const { page = 1 } = req.query

    const handedOut = await Order.findAll({
      where: {
        end_date: {
          [Op.ne]: null,
        },
      },
      attributes: ['id', 'product', 'start_date', 'end_date'],
      limit: 20,
      offset: (page - 1) * 20,
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
      order.end_date = new Date()
      order.signature_id = req.body.signature_id
      order.save()
    }

    return res.json(order)
  }
}

export default new HandedOutController()
