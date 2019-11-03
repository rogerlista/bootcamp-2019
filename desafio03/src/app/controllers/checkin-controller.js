import { Op } from 'sequelize'
import { startOfWeek, endOfWeek } from 'date-fns'

import Student from '../models/student'
import Checkin from '../models/checkin'

class CheckinController {
  async index(req, res) {
    const checkins = await Checkin.findAll({
      where: { student_id: req.params.id },
    })

    return res.json(checkins)
  }

  async store(req, res) {
    const student = await Student.findByPk(req.params.id)

    if (!student) {
      return res.status(404).json({ error: 'Student does not exists' })
    }

    const startDateWeek = startOfWeek(new Date())
    const endDateWeek = endOfWeek(new Date())
    const totalCheckins = await Checkin.count({
      where: {
        student_id: student.id,
        created_at: { [Op.lt]: endDateWeek, [Op.gt]: startDateWeek },
      },
      order: [['created_at', 'DESC']],
    })

    if (totalCheckins > 4) {
      return res.status(401).json({ error: 'unauthorized access' })
    }

    const { id, created_at } = await Checkin.create({ student_id: student.id })

    return res.json({ id, created_at })
  }
}

export default new CheckinController()
