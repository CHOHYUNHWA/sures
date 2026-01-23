import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api/authApi'
import { getAccessToken } from '@/shared/api'
import type { Admin, LoginRequest, SignupRequest } from '@/shared/types'

export function useAuth() {
  const navigate = useNavigate()
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check initial auth state
  useEffect(() => {
    const token = getAccessToken()
    if (token) {
      setIsAuthenticated(true)
      // Optionally fetch user info
      authApi
        .getMe()
        .then(setAdmin)
        .catch(() => {
          setIsAuthenticated(false)
        })
    }
  }, [])

  const login = useCallback(
    async (data: LoginRequest) => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await authApi.login(data)
        setAdmin(response.admin)
        setIsAuthenticated(true)
        navigate('/admin/reservations')
        return response
      } catch (err) {
        const message = err instanceof Error ? err.message : '로그인에 실패했습니다'
        setError(message)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [navigate]
  )

  const register = useCallback(
    async (data: SignupRequest) => {
      setIsLoading(true)
      setError(null)
      try {
        await authApi.register(data)
        navigate('/admin/login', { state: { success: '회원가입이 완료되었습니다' } })
      } catch (err) {
        const message = err instanceof Error ? err.message : '회원가입에 실패했습니다'
        setError(message)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [navigate]
  )

  const logout = useCallback(() => {
    authApi.logout()
    setAdmin(null)
    setIsAuthenticated(false)
  }, [])

  return {
    admin,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
  }
}
