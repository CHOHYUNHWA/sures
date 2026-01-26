import type { ReactNode, ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'accent' | 'outline' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  block?: boolean
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: styles.btnPrimary,
  accent: styles.btnAccent,
  outline: styles.btnOutline,
  danger: styles.btnDanger,
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: styles.btnSm,
  md: styles.btnMd,
  lg: styles.btnLg,
}

export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classes = [
    styles.btn,
    variantClasses[variant],
    sizeClasses[size],
    block ? styles.btnBlock : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
