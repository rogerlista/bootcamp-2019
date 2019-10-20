import * as yup from 'yup'
import { startOfHour, parseISO, isBefore } from 'date-fns'

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

    const hourStart = startOfHour(parseISO(date))

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' })
    }

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    })

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' })
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    })

    return res.json(appointment)
  }
}

export default new AppointmentController()
