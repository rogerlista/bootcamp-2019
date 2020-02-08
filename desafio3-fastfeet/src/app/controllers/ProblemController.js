import * as Yup from 'yup'

import Recipient from '../models/Recipient'
import Deliveryman from '../models/Deliveryman'
import Order from '../models/Order'
import DeliveryProblem from '../models/DeliveryProblem'

class ProblemController {
  async index(req, res) {
    const { page = 1 } = req.query
    const deliveryProblems = await DeliveryProblem.findAll({
      attributes: ['id', 'description'],
      limit: 20,
      offset: (page - 1) * 20,
      include: {
        model: Order,
        as: 'delivery',
        attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
        include: {
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
        include: {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
      },
    })

    return res.json(deliveryProblems)
  }

  async show(req, res) {
    const { page = 1 } = req.query
    const deliveryProblems = await DeliveryProblem.findAll({
      where: { delivery_id: req.params.delivery_id },
      attributes: ['id', 'description'],
      limit: 20,
      offset: (page - 1) * 20,
      include: {
        model: Order,
        as: 'delivery',
        attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
        include: {
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
        include: {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
      },
    })

    return res.json(deliveryProblems)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const { delivery_id } = req.params
    const { description } = req.body
    const deliveryProblem = await DeliveryProblem.create({
      delivery_id,
      description,
    })
    const delivery = await deliveryProblem.getDelivery()

    return res.json({
      id: deliveryProblem.id,
      description: deliveryProblem.description,
      product: delivery.product,
    })
  }
}

export default new ProblemController()
