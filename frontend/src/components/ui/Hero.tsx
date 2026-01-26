import type { ReactNode } from 'react'
import styles from './Hero.module.css'

interface HeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  children?: ReactNode
  showTrustBadges?: boolean
}

export function Hero({ title, subtitle, backgroundImage, children, showTrustBadges }: HeroProps) {
  const style = backgroundImage
    ? { backgroundImage: `linear-gradient(rgba(1, 21, 65, 0.6), rgba(1, 21, 65, 0.3)), url(${backgroundImage})` }
    : {}

  return (
    <section className={styles.hero} style={style}>
      <div className={styles.content}>
        <div className={styles.badge}>SURES TAX & ACCOUNTING</div>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children && <div className={styles.actions}>{children}</div>}
        {showTrustBadges && (
          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>✓</span>
              <span>국세청 출신 세무사</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>✓</span>
              <span>10년+ 실무 경험</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>✓</span>
              <span>맞춤 세무 전략</span>
            </div>
          </div>
        )}
      </div>
      <div className={styles.decorLine} />
    </section>
  )
}
