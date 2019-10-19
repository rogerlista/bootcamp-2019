import * as yup from 'yup'

import Student from '../models/student'

class StudentController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup
        .string()
        .trim()
        .min(3)
        .required(),
      email: yup
        .string()
        .email()
        .required(),
      age: yup
        .number()
        .integer()
        .positive()
        .moreThan(0)
        .lessThan(140)
        .required(),
      weight: yup
        .number()
        .positive()
        .moreThan(0)
        .lessThan(500)
        .required(),
      height: yup
        .number()
        .positive()
        .moreThan(0)
        .lessThan(3.5)
        .required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const student = await Student.create(req.body)

    return res.json(student)
  }

  async update(req, res) {
    const schema = yup.object().shape({
      name: yup
        .string()
        .trim()
        .min(3),
      email: yup.string().email(),
      age: yup
        .number()
        .integer()
        .positive()
        .moreThan(0)
        .lessThan(140),
      weight: yup
        .number()
        .positive()
        .moreThan(0)
        .lessThan(500),
      height: yup
        .number()
        .positive()
        .moreThan(0)
        .lessThan(3.5),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { id } = req.params
    const student = await Student.findByPk(id)

    await student.update(req.body)

    return res.json(student)
  }
}

export default new StudentController()
