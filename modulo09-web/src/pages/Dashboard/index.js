import React, { useState, useMemo, useEffect } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

import { format, subDays, addDays } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'

import api from '~/services/api'

import { Container, Time } from './styles'

export default function Dashboard() {
  const [date, setDate] = useState(new Date())
  const [schedule, setSchedule] = useState([])

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date],
  )

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedules', {
        params: { date },
      })

      setSchedule(response.data)
    }

    loadSchedule()
  }, [date])

  function handlePrevDay() {
    setDate(subDays(date, 1))
  }

  function handleNextDay() {
    setDate(addDays(date, 1))
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#fff" />
        </button>

        <strong>{dateFormatted}</strong>

        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>

      <ul>
        {schedule.map(time => (
          <Time key={time.time} past={time.past} available={!time.appointment}>
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appointment.user.name : 'Em aberto'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  )
}
