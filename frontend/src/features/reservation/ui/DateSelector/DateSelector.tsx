import { useMemo } from 'react'
import styles from './DateSelector.module.css'

interface DateSelectorProps {
  selectedDate: string | null
  onSelect: (date: string) => void
  days?: number
  excludeWeekends?: boolean
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

export function DateSelector({
  selectedDate,
  onSelect,
  days = 14,
  excludeWeekends = true,
}: DateSelectorProps) {
  const dates = useMemo(() => {
    const result: Array<{
      dateStr: string
      date: Date
      isToday: boolean
      isWeekend: boolean
    }> = []
    const today = new Date()
    let dayOffset = 0

    while (result.length < days) {
      const date = new Date(today)
      date.setDate(today.getDate() + dayOffset)
      dayOffset++

      const dayOfWeek = date.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

      if (excludeWeekends && isWeekend) {
        continue
      }

      result.push({
        dateStr: date.toISOString().split('T')[0],
        date,
        isToday: result.length === 0 && dayOffset === 1,
        isWeekend,
      })
    }

    return result
  }, [days, excludeWeekends])

  return (
    <div className={styles.scroll}>
      {dates.map(({ dateStr, date, isToday, isWeekend }) => {
        const isSelected = selectedDate === dateStr
        const dayOfWeek = date.getDay()

        const classes = [
          styles.btn,
          isSelected && styles.selected,
          isToday && styles.today,
          isWeekend && styles.weekend,
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <button key={dateStr} type="button" className={classes} onClick={() => onSelect(dateStr)}>
            <span className={styles.weekday}>
              {WEEKDAYS[dayOfWeek]}
              {isToday && ' (오늘)'}
            </span>
            <span className={styles.day}>{date.getDate()}</span>
            <span className={styles.month}>{date.getMonth() + 1}월</span>
          </button>
        )
      })}
    </div>
  )
}
