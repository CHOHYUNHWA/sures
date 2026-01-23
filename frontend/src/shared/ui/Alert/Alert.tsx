import type { HTMLAttributes, ReactNode } from 'react'
import styles from './Alert.module.css'

export type AlertVariant = 'success' | 'error' | 'warning' | 'info'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  children: ReactNode
  onClose?: () => void
}

export function Alert({ variant = 'info', children, onClose, className = '', ...props }: AlertProps) {
  return (
    <div className={`${styles.alert} ${styles[variant]} ${className}`} role="alert" {...props}>
      <span className={styles.content}>{children}</span>
      {onClose && (
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="닫기">
          &times;
        </button>
      )}
    </div>
  )
}
