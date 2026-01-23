import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Card, CardBody, Button, Input, Alert } from '@/shared/ui'
import { authApi } from '@/features/auth'
import { setTokens } from '@/shared/api'
import styles from './Login.module.css'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(location.state?.success || null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!username || !password) {
      setError('아이디와 비밀번호를 입력해주세요.')
      return
    }

    setIsLoading(true)

    try {
      const response = await authApi.login({ username, password })
      setTokens(response.accessToken, response.refreshToken)
      navigate('/admin/reservations')
    } catch (err) {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/customer" className={styles.logo}>
          <img src="/image/logo.png" alt="Sures 로고" />
          <span className={styles.logoText}>Sures</span>
        </Link>
      </header>

      <div className={styles.content}>
        <h1 className={styles.title}>관리자 로그인</h1>

        {error && (
          <Alert variant="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        )}

        <Card>
          <CardBody>
            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.formGroup}>
                <Input
                  label="아이디"
                  placeholder="아이디를 입력하세요"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
              </div>

              <div className={styles.formGroup}>
                <Input
                  label="비밀번호"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" variant="primary" size="lg" block loading={isLoading}>
                로그인
              </Button>
            </form>

            <div className={styles.links}>
              <Link to="/admin/register">회원가입</Link>
              <span className={styles.divider}>|</span>
              <Link to="/admin/find-account">계정 찾기</Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
