'use client'

import { FadeIn } from './FadeIn'
import styles from './BottomCTA.module.css'

export function BottomCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.sectionInner}>
        <FadeIn delay={0}>
          <h2 className={styles.ctaTitle}>상담이 필요하신가요?</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className={styles.ctaDescription}>
            편리한 방법으로 문의해 주세요
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className={styles.ctaButtons}>
            <a
              href="https://naver.me/G4GVUglM"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              <span className={styles.ctaIcon}>📅</span>
              <span className={styles.ctaButtonText}>
                <strong>네이버 예약</strong>
                <small>온라인으로 간편하게</small>
              </span>
            </a>
            <a
              href="http://pf.kakao.com/_zqepn"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.ctaButton} ${styles.ctaButtonKakao}`}
            >
              <span className={styles.ctaIcon}>💬</span>
              <span className={styles.ctaButtonText}>
                <strong>카카오톡 상담</strong>
                <small>실시간 문의 가능</small>
              </span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
