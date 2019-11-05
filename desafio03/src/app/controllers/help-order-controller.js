import * as yup from 'yup'

import Student from '../models/student'
import HelpOrder from '../models/help-order'

import mail from '../../lib/mail'

class HelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({ where: { answer_at: null } })

    return res.json(helpOrders)
  }

  async show(req, res) {
    const students = await Student.findByPk(req.params.id)

    if (!students) {
      return res.status(400).json({ error: 'Student does not exists' })
    }

    const helpOrders = await HelpOrder.findAll({
      where: { student_id: req.params.id },
    })

    return res.json(helpOrders)
  }

  async store(req, res) {
    const schema = yup.object().shape({
      question: yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data' })
    }

    const student = await Student.findByPk(req.params.id)

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' })
    }

    const { id, question } = await HelpOrder.create({
      question: req.body.question,
      student_id: student.id,
    })

    return res.json({ id, question })
  }

  async update(req, res) {
    const schema = yup.object().shape({
      answer: yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data' })
    }

    const helpOrder = await HelpOrder.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    })

    if (!helpOrder) {
      return res.status(400).json({ error: 'Help order does not exists' })
    }

    const { id, question, answer, answer_at } = await helpOrder.update({
      answer: req.body.answer,
      answer_at: new Date(),
    })

    await mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: 'Resposta a sua pergunta',
      template: 'help-order',
      context: {
        name: helpOrder.student.name,
        question,
        answer,
      },
    })

    return res.json({ id, question, answer, answer_at })
  }
}

export default new HelpOrderController()
