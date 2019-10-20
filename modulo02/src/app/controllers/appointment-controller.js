import * as yup from 'yup'

import User from '../models/user'
import Appointment from '../models/appointment'

class AppointmentController {
  async store(req, res) {
    const schema = yup.object().shape({
      provider_id: yup.number().required(),
      date: yup.date().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data' })
    }

    const { date, provider_id } = req.body

    /**
     * Check if provider_id is a provider
     */
    const isProvider = await User.findOne({
      where: {
        id: provider_id,
        provider: true,
      },
    })

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' })
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    })

    return res.json(appointment)
  }
}

export default new AppointmentController()
