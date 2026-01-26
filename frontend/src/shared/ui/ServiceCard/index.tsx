import { Link } from 'react-router-dom'
import styles from './ServiceCard.module.css'

export interface ServiceCardProps {
  title: string
  description: string
  link?: string
}

export function ServiceCard({ title, description, link }: ServiceCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.divider}></div>
      <p className={styles.description}>{description}</p>
      {link && (
        <Link to={link} className={styles.link}>
          자세히 보기 →
        </Link>
      )}
    </div>
  )
}
