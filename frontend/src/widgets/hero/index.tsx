import type { ReactNode } from 'react'
import styles from './Hero.module.css'

export interface HeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  children?: ReactNode
}

export function Hero({ title, subtitle, backgroundImage, children }: HeroProps) {
  const style = backgroundImage
    ? { backgroundImage: `linear-gradient(rgba(1, 21, 65, 0.6), rgba(1, 21, 65, 0.3)), url(${backgroundImage})` }
    : {}

  return (
    <section className={styles.hero} style={style}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children && <div className={styles.actions}>{children}</div>}
      </div>
    </section>
  )
}
