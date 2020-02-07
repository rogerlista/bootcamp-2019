import * as Yup from 'yup'

import Deliveryman from '../models/Deliveryman'

class DeliverymanController {
  async index(req, res) {
    const deliverymen = await Deliveryman.findAll()
    return res.json(deliverymen)
  }

  async show(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id)

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman does not exists' })
    }

    return res.json(deliveryman)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    })

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists.' })
    }

    const { id, name, email, avatar_id } = await Deliveryman.create(req.body)
    return res.json({ id, name, email, avatar_id })
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const { email } = req.body
    const deliveryman = await Deliveryman.findByPk(req.params.id)

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found.' })
    }

    if (email && email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({ where: { email } })

      if (deliverymanExists) {
        return res.status(400).json({ error: 'Deliveryman already exists.' })
      }
    }

    const { id, name, avatar_id } = await deliveryman.update(req.body)

    return res.json({
      id,
      name,
      email,
      avatar_id,
    })
  }

  async delete(req, res) {
    const { id } = req.params
    const deliveryman = await Deliveryman.findByPk(id)

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found.' })
    }

    await deliveryman.destroy()

    return res.json()
  }
}

export default new DeliverymanController()
