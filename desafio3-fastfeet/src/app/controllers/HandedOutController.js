import { Op } from 'sequelize'

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
}

export default new HandedOutController()
