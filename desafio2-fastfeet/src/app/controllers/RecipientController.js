import * as Yup from 'yup'

import Recipient from '../models/Recipient'

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll()
    return res.json(recipients)
  }

  async show(req, res) {
    const recipient = await Recipient.findByPk(req.recipientId)

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient does not exists' })
    }

    return res.json(recipient)
  }

  async store(req, res) {
    const {
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    } = await Recipient.create(req.body)

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    })
  }

  async update(req, res) {
    const recipient = await Recipient.findByPk(req.recipientId)

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient does not exists' })
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    } = await recipient.update(req.body)

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    })
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.recipientId)

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient does not exists' })
    }

    recipient.destroy()

    return res.json()
  }
}

export default new RecipientController()
