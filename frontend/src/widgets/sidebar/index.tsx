import { useState } from 'react'
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { clearTokens } from '@/shared/api'
import { Footer } from '@/widgets/footer'
import styles from './Sidebar.module.css'

export function AdminLayout() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    clearTokens()
    navigate('/admin/login')
  }

  return (
    <div className="page-wrapper">
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerInner}>
            <Link to="/admin/reservations" className={styles.logo}>
              <img src="/image/logo.png" alt="Sures 로고" />
              <span className={styles.logoText}>Sures Admin</span>
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
          </div>
        </div>

        <nav className={`${styles.sidebar} ${isMenuOpen ? styles.active : ''}`}>
          <NavLink
            to="/admin/reservations"
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.activeNav : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            예약 관리
          </NavLink>
          <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
            로그아웃
          </button>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export { AdminLayout as default }
