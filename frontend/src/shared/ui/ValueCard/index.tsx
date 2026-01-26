import { ReactNode } from 'react'
import styles from './ValueCard.module.css'

export interface ValueCardProps {
  icon?: ReactNode
  title: string
  description: string
}

export function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className={styles.card}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  )
}
