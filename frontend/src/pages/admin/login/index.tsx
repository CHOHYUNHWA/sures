import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      // TODO: API 연동
      console.log('Login attempt:', formData)
      navigate('/admin/reservations')
    } catch (err) {
      setError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.')
    }
  }

  return (
    <div className="container" style={{ paddingTop: '80px' }}>
      <div className="login-box">
        <h1 style={{ textAlign: 'center', marginBottom: '32px', color: 'var(--color-primary)' }}>
          관리자 로그인
        </h1>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              className="input"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              className="input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            로그인
          </button>
        </form>

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <a href="/admin/register" style={{ color: 'var(--color-accent)' }}>
            회원가입
          </a>
          <span style={{ margin: '0 8px', color: '#ccc' }}>|</span>
          <a href="/admin/find-account" style={{ color: 'var(--color-accent)' }}>
            아이디/비밀번호 찾기
          </a>
        </div>
      </div>
    </div>
  )
}
