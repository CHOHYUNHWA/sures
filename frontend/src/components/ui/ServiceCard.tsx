import Link from 'next/link'
import styles from './ServiceCard.module.css'

interface ServiceCardProps {
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
        <Link href={link} className={styles.link}>
          자세히 보기 →
        </Link>
      )}
    </div>
  )
}
