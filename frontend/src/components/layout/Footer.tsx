import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.companyInfo}>
          <div className={styles.infoLine}>
            <strong className={styles.companyName}>슈어스세무회계</strong>
            <span className={styles.separator}>|</span>
            <span>대표자명: 김성국</span>
            <span className={styles.separator}>|</span>
            <a href="tel:02-6954-7716" className={styles.infoLink}>Tel: 02-6954-7716</a>
            <span className={styles.separator}>|</span>
            <a href="mailto:surestax@naver.com" className={styles.infoLink}>E-Mail: surestax@naver.com</a>
          </div>
          <div className={styles.infoLine}>
            <span>주소: 서울특별시 강동구 천호대로 1024 (힐스테이트천호역젠트리스) 303호</span>
          </div>
          <div className={styles.infoLine}>
            <span>영업시간: 평일 09:00 - 18:00 (점심시간 12:00 - 13:00)</span>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} 슈어스세무회계. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
