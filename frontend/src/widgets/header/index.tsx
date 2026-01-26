import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Footer } from '@/widgets/footer'
import styles from './Header.module.css'

export function CustomerLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // 페이지 전환 시 스크롤을 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Hero 컴포넌트를 사용하는 페이지들은 padding 제거
  const isHeroPage =
    location.pathname === '/customer' ||
    location.pathname === '/' ||
    location.pathname === '/customer/services' ||
    location.pathname === '/customer/why' ||
    location.pathname === '/customer/contact'

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
              <Link to="/customer" onClick={() => setIsMenuOpen(false)}>
                홈
              </Link>
              <Link to="/customer/services" onClick={() => setIsMenuOpen(false)}>
                서비스 소개
              </Link>
              <Link to="/customer/why" onClick={() => setIsMenuOpen(false)}>
                Why SURES
              </Link>
              <Link to="/customer/contact" onClick={() => setIsMenuOpen(false)}>
                오시는 길
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className={isHeroPage ? '' : 'main-content'}>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export { CustomerLayout as default }