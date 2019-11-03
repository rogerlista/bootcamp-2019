import * as yup from 'yup'
import { parseISO, isBefore, addMonths, format } from 'date-fns'
import pt from 'date-fns/locale/pt'

import mail from '../../lib/mail'

import Student from '../models/student'
import Plan from '../models/plan'
import Matriculation from '../models/matriculation'

class MatriculationController {
  async index(req, res) {
    const matriculations = await Matriculation.findAll()

    return res.json(matriculations)
  }

  async show(req, res) {
    const matriculation = await Matriculation.findByPk(req.params.id)

    if (!matriculation) {
      return res.status(400).json({ error: 'Matriculation does not exists' })
    }

    return res.json(matriculation)
  }

  async store(req, res) {
    const schema = yup.object().shape({
      student_id: yup
        .number()
        .integer()
        .positive()
        .required(),
      plan_id: yup
        .number()
        .integer()
        .positive()
        .required(),
      start_date: yup.date().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data' })
    }

    const { student_id, plan_id, start_date } = req.body

    const student = await Student.findByPk(student_id)

    if (!student) {
      return res.status(400).json({ error: 'Student not found' })
    }

    const plan = await Plan.findByPk(plan_id)

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found' })
    }

    const startDate = parseISO(start_date)

    if (isBefore(startDate, new Date())) {
      return res.status(404).json({ error: 'Past dates are not permitted' })
    }

    const end_date = addMonths(startDate, plan.duration)
    const price = plan.price * plan.duration

    const { id } = await Matriculation.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    })

    await mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula confirmada',
      template: 'matriculation',
      context: {
        name: student.name,
        plan: plan.title,
        price: plan.price,
        start_date: format(parseISO(start_date), 'dd/MM/yyyy', {
          locale: pt,
        }),
        end_date: format(end_date, 'dd/MM/yyyy', {
          locale: pt,
        }),
      },
    })

    return res.json({ id, student_id, plan_id, start_date, end_date, price })
  }

  async update(req, res) {
    const schema = yup.object().shape({
      student_id: yup.lazy(value =>
        !value
          ? yup.mixed().notRequired()
          : yup
              .number()
              .integer()
              .positive()
              .required()
      ),
      plan_id: yup.lazy(value =>
        !value
          ? yup.mixed().notRequired()
          : yup
              .number()
              .integer()
              .positive()
              .required()
      ),
      start_date: yup.lazy(value =>
        !value ? yup.mixed().notRequired() : yup.date().required()
      ),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data' })
    }

    const matriculation = await Matriculation.findByPk(req.params.id)

    if (!matriculation) {
      return res.status(404).json({ error: 'Matriculation does not exists' })
    }

    const {
      id,
      student_id,
      plan_id,
      price,
      start_date,
      end_date,
    } = await matriculation.update(req.body)

    return res.json({ id, student_id, plan_id, price, start_date, end_date })
  }

  async delete(req, res) {
    const matriculation = await Matriculation.findByPk(req.params.id)

    if (!matriculation) {
      return res.status(404).json({ error: 'Matriculation does not exists' })
    }

    await matriculation.destroy()

    return res.json()
  }
}

export default new MatriculationController()
