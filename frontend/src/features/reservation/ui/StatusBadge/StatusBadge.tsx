import type { ReservationStatus } from '@/shared/types'
import { ReservationStatusLabels } from '@/shared/types'
import styles from './StatusBadge.module.css'

interface StatusBadgeProps {
  status: ReservationStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const label = ReservationStatusLabels[status]

  return <span className={`${styles.badge} ${styles[status.toLowerCase()]}`}>{label}</span>
}
