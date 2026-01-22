import { Outlet, NavLink, useNavigate } from 'react-router-dom'

export function AdminLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    navigate('/admin/login')
  }

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <a href="/admin" className="logo">
            Sures Admin
          </a>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/admin/reservations" className="nav-item">
            예약 관리
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn btn-logout">
            로그아웃
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}

export { AdminLayout as default }
