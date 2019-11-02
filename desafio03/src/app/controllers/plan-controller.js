import * as yup from 'yup'

import Plan from '../models/plan'

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    })

    return res.json(plans)
  }

  async show(req, res) {
    const plan = await Plan.findByPk(req.params.id, {
      attributes: ['id', 'title', 'duration', 'price'],
    })

    if (!plan) {
      return res.status(404).json({ error: 'Plan does not exists' })
    }

    return res.json(plan)
  }

  async store(req, res) {
    const schema = yup.object().shape({
      title: yup.string().required(),
      duration: yup
        .number()
        .integer()
        .positive()
        .required(),
      price: yup
        .number()
        .positive()
        .required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data' })
    }

    const { id, title, duration, price } = await Plan.create(req.body)

    return res.json({ id, title, duration, price })
  }

  async update(req, res) {
    const plan = await Plan.findByPk(req.params.id)

    if (!plan) {
      return res.status(404).json({ error: 'Plan does not exists' })
    }

    const { id, title, duration, price } = await plan.update(req.body)

    return res.json({ id, title, duration, price })
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id)

    if (!plan) {
      return res.status(404).json({ error: 'Plan does not exists' })
    }

    plan.destroy()

    return res.json()
  }
}

export default new PlanController()
