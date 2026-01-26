'use client'

import styles from './FloatingKakao.module.css'

const KAKAO_CHAT_URL = 'http://pf.kakao.com/_zqepn'

export function FloatingKakao() {
  return (
    <a
      href={KAKAO_CHAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.floatingButton}
      aria-label="카카오톡 상담"
    >
      <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.648 1.758 4.98 4.397 6.319-.136.482-.878 3.106-.906 3.326 0 0-.018.172.09.238.108.066.234.029.234.029.31-.044 3.584-2.345 4.148-2.735.66.09 1.341.138 2.037.138 5.523 0 10-3.463 10-7.691S17.523 3 12 3z"/>
      </svg>
      <span className={styles.text}>상담하기</span>
    </a>
  )
}

export { KAKAO_CHAT_URL }
