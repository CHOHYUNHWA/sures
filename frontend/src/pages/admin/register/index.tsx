import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardBody, Button, Input, Alert } from '@/shared/ui'
import { authApi } from '@/features/auth'
import styles from '../login/Login.module.css'

export function AdminRegisterPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    // 아이디: 4~20자, 영문소문자+숫자
    if (!formData.username) {
      newErrors.username = '아이디를 입력해주세요.'
    } else if (!/^[a-z0-9]{4,20}$/.test(formData.username)) {
      newErrors.username = '아이디는 4~20자의 영문 소문자와 숫자만 사용 가능합니다.'
    }

    // 비밀번호: 8자 이상, 영문+숫자+특수문자
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.'
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.'
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(formData.password)) {
      newErrors.password = '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.'
    }

    // 비밀번호 확인
    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호 확인을 입력해주세요.'
    } else if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.'
    }

    // 이름: 2~20자
    if (!formData.name) {
      newErrors.name = '이름을 입력해주세요.'
    } else if (formData.name.length < 2 || formData.name.length > 20) {
      newErrors.name = '이름은 2~20자로 입력해주세요.'
    }

    // 이메일
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validate()) {
      return
    }

    setIsLoading(true)

    try {
      await authApi.register(formData)
      navigate('/admin/login', {
        state: { success: '회원가입이 완료되었습니다. 로그인해주세요.' }
      })
    } catch (err: any) {
      const message = err.response?.data?.error?.message || '회원가입에 실패했습니다.'
      setError(message)
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
        <h1 className={styles.title}>관리자 회원가입</h1>

        {error && (
          <Alert variant="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Card>
          <CardBody>
            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.formGroup}>
                <Input
                  label="아이디"
                  placeholder="영문 소문자, 숫자 4~20자"
                  value={formData.username}
                  onChange={handleChange('username')}
                  error={errors.username}
                  autoFocus
                />
              </div>

              <div className={styles.formGroup}>
                <Input
                  label="비밀번호"
                  type="password"
                  placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                  value={formData.password}
                  onChange={handleChange('password')}
                  error={errors.password}
                />
              </div>

              <div className={styles.formGroup}>
                <Input
                  label="비밀번호 확인"
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={formData.passwordConfirm}
                  onChange={handleChange('passwordConfirm')}
                  error={errors.passwordConfirm}
                />
              </div>

              <div className={styles.formGroup}>
                <Input
                  label="이름"
                  placeholder="이름을 입력하세요"
                  value={formData.name}
                  onChange={handleChange('name')}
                  error={errors.name}
                />
              </div>

              <div className={styles.formGroup}>
                <Input
                  label="이메일"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={formData.email}
                  onChange={handleChange('email')}
                  error={errors.email}
                />
              </div>

              <Button type="submit" variant="primary" size="lg" block loading={isLoading}>
                회원가입
              </Button>
            </form>

            <div className={styles.links}>
              <Link to="/admin/login">로그인으로 돌아가기</Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
