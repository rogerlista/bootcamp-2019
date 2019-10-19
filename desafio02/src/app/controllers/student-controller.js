import Student from '../models/student'

class StudentController {
  async store(req, res) {
    const student = await Student.create(req.body)

    return res.json(student)
  }

  async update(req, res) {
    const { id } = req.params
    const student = await Student.findByPk(id)

    await student.update(req.body)

    return res.json(student)
  }
}

export default new StudentController()
