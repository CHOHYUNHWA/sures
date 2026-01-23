import type { ConsultationType } from '@/shared/types'
import { ConsultationTypeLabels } from '@/shared/types'
import styles from './ConsultationTypeGrid.module.css'

interface ConsultationTypeGridProps {
  selectedType: ConsultationType | null
  onSelect: (type: ConsultationType) => void
}

const CONSULTATION_TYPES: ConsultationType[] = [
  'TAX_RETURN',
  'TAX_CONSULTATION',
  'BOOKKEEPING',
  'BUSINESS_REGISTRATION',
  'OTHER',
]

export function ConsultationTypeGrid({ selectedType, onSelect }: ConsultationTypeGridProps) {
  return (
    <div className={styles.grid}>
      {CONSULTATION_TYPES.map((type) => {
        const isSelected = selectedType === type
        const classes = [styles.btn, isSelected && styles.selected].filter(Boolean).join(' ')

        return (
          <button key={type} type="button" className={classes} onClick={() => onSelect(type)}>
            {ConsultationTypeLabels[type]}
          </button>
        )
      })}
    </div>
  )
}
