import * as Yup from 'yup'

import Deliveryman from '../models/Deliveryman'
import Order from '../models/Order'

import Mail from '../../lib/Mail'

class OrderController {
  async index(req, res) {
    const orders = await Order.findAll()
    return res.json(orders)
  }

  async show(req, res) {
    const order = await Order.findByPk(req.params.id)

    if (!order) {
      return res.status(404).json({ error: 'Order does not exists' })
    }

    return res.json(order)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const order = await Order.create(req.body)
    const deliveryman = await order.getDeliveryman()
    const recipient = await order.getRecipient()

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova entrega',
      template: 'delivery',
      context: {
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        city: recipient.city,
        state: recipient.state,
        product: order.product,
      },
    })

    return res.json({
      id: order.id,
      recipient_id: order.recipient_id,
      deliveryman_id: order.deliveryman_id,
      product: order.product,
    })
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string(),
    })

    if (!schema.isValid()) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const order = await Order.findByPk(req.params.id)

    if (!order) {
      return res.status(400).json({ error: 'Order not found.' })
    }

    const { id, recipient_id, deliveryman_id, product } = await order.update(
      req.body
    )

    return res.json({ id, recipient_id, deliveryman_id, product })
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id)

    if (!order) {
      return res.status(400).json({ error: 'Order not found.' })
    }

    if (!order.canceled_at) {
      order.canceled_at = new Date()
      order.save()
    }

    return res.json()
  }
}

export default new OrderController()
