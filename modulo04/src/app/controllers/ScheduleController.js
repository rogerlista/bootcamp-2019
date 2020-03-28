import {
  startOfDay,
  endOfDay,
  parseISO,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  isBefore,
  isEqual,
} from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { Op } from 'sequelize'

import User from '../models/User'
import Appointment from '../models/Appointment'

class ScheduleController {
  async index(req, res) {
    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    })

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not provider.' })
    }

    const { date } = req.query
    const parsedDate = parseISO(date)

    const schedules = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
      order: ['date'],
    })

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const datas = hours.map(hour => {
      const checkDate = setMilliseconds(
        setSeconds(setMinutes(setHours(parsedDate, hour), 0), 0),
        0
      )
      const compareDate = utcToZonedTime(checkDate, timezone)

      return {
        time: `${hour}:00h`,
        past: isBefore(compareDate, new Date()),
        appointment: schedules.find(appointment =>
          isEqual(appointment.date, compareDate)
        ),
      }
    })

    return res.json(datas)
  }
}

export default new ScheduleController()
