import File from '../models/File'
import Recipient from '../models/Recipient'
import Deliveryman from '../models/Deliveryman'
import Order from '../models/Order'

class DeliveryController {
  async index(req, res) {
    const { page = 1 } = req.query
    const deliveries = await Order.findAll({
      where: {
        deliveryman_id: req.params.deliveryman_id,
        canceled_at: null,
        end_date: null,
      },
      attributes: ['id', 'product', 'start_date'],
      order: ['start_date'],
      limit: 20,
      offset: (page - 1) * 20,
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
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'name', 'path'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attribute: ['id', 'name', 'path'],
        },
      ],
    })

    return res.json(deliveries)
  }
}

export default new DeliveryController()
