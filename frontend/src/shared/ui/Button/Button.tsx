import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  block?: boolean
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', block = false, loading = false, className = '', children, disabled, ...props }, ref) => {
    const classes = [
      styles.btn,
      styles[`btn-${variant}`],
      styles[`btn-${size}`],
      block && styles['btn-block'],
      loading && styles['btn-loading'],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {loading ? <span className={styles.spinner} /> : children}
      </button>
    )
  }
)

Button.displayName = 'Button'
