import styles from './ProcessStep.module.css'

export interface ProcessStepProps {
  step: number
  title: string
  description: string
  showArrow?: boolean
}

export function ProcessStep({ step, title, description, showArrow = true }: ProcessStepProps) {
  return (
    <div className={styles.step}>
      <div className={styles.badge}>{step}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {showArrow && <div className={styles.arrow}>→</div>}
    </div>
  )
}
