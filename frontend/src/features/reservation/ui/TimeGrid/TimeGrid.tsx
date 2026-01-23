import { useMemo } from 'react'
import styles from './TimeGrid.module.css'

interface TimeGridProps {
  selectedTime: string | null
  reservedTimes: string[]
  selectedDate: string | null
  onSelect: (time: string) => void
}

const AVAILABLE_TIMES = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']

export function TimeGrid({ selectedTime, reservedTimes, selectedDate, onSelect }: TimeGridProps) {
  const isToday = useMemo(() => {
    if (!selectedDate) return false
    const today = new Date().toISOString().split('T')[0]
    return selectedDate === today
  }, [selectedDate])

  const currentHour = useMemo(() => new Date().getHours(), [])

  if (!selectedDate) {
    return <p className={styles.message}>날짜를 먼저 선택해주세요</p>
  }

  return (
    <div className={styles.grid}>
      {AVAILABLE_TIMES.map((time) => {
        const hour = parseInt(time.split(':')[0])
        const isReserved = reservedTimes.includes(time)
        const isPassed = isToday && hour <= currentHour
        const isSelected = selectedTime === time
        const isDisabled = isReserved || isPassed

        const classes = [
          styles.btn,
          isSelected && styles.selected,
          isReserved && styles.reserved,
          isPassed && styles.passed,
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <button
            key={time}
            type="button"
            className={classes}
            disabled={isDisabled}
            onClick={() => !isDisabled && onSelect(time)}
          >
            <span className={styles.text}>{isReserved ? `예약됨(${time})` : time}</span>
          </button>
        )
      })}
    </div>
  )
}
