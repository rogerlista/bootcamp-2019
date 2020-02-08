import DeliveryProblem from '../models/DeliveryProblem'

import Queue from '../../lib/Queue'
import CancellationMail from '../jobs/CancellationMail'

class CancelDeliveryController {
  async delete(req, res) {
    const deliveryProblem = await DeliveryProblem.findByPk(req.params.id)

    if (!deliveryProblem) {
      return res.status(400).json({ error: 'Delivery problem not found.' })
    }

    const delivery = await deliveryProblem.getDelivery()
    const deliveryman = await delivery.getDeliveryman()
    const recipient = await delivery.getRecipient()

    if (!delivery.canceled_at) {
      delivery.canceled_at = new Date()
      delivery.save()

      await Queue.add(CancellationMail.key, {
        deliveryman,
        deliveryProblem,
        delivery,
        recipient,
      })
    }

    return res.json({
      id: deliveryProblem.id,
      description: deliveryProblem.description,
      delivery_id: delivery.id,
      product: delivery.product,
      start_date: delivery.start_date,
      canceled_at: delivery.canceled_at,
    })
  }
}

export default new CancelDeliveryController()
