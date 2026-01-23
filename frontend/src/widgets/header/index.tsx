import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

export function CustomerLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // 홈페이지는 헤더 스타일이 다름
  const isHomePage = location.pathname === '/customer' || location.pathname === '/'

  return (
    <div className="page-wrapper">
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerInner}>
            <Link to="/customer" className={styles.logo}>
              <img src="/image/logo.png" alt="Sures 로고" />
              <span className={styles.logoText}>Sures</span>
            </Link>

            <button
              className={styles.navToggle}
              aria-label="메뉴 열기"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <nav className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
              <Link to="/customer/reservations/apply" onClick={() => setIsMenuOpen(false)}>
                예약 신청
              </Link>
              <Link to="/customer/reservations/verify" onClick={() => setIsMenuOpen(false)}>
                예약 조회
              </Link>
              <Link to="/admin/login" onClick={() => setIsMenuOpen(false)}>
                관리자
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className={isHomePage ? '' : 'main-content'}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <p>&copy; 2025 Sures. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export { CustomerLayout as default }
