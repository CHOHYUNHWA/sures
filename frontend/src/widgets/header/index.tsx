import { Outlet } from 'react-router-dom'

export function CustomerLayout() {
  return (
    <div className="customer-layout">
      <header className="header">
        <div className="container">
          <a href="/customer" className="logo">
            <img src="/logo.png" alt="Sures" style={{ height: '32px' }} />
          </a>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Sures. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export { CustomerLayout as default }
