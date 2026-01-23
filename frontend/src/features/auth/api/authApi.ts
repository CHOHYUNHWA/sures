import { api, setTokens, clearTokens } from '@/shared/api'
import type { LoginRequest, LoginResponse, SignupRequest, Admin } from '@/shared/types'

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/admin/auth/login', data)
    const { accessToken, refreshToken } = response.data
    setTokens(accessToken, refreshToken)
    return response.data
  },

  register: async (data: SignupRequest): Promise<Admin> => {
    const response = await api.post<Admin>('/admin/auth/register', data)
    return response.data
  },

  getMe: async (): Promise<Admin> => {
    const response = await api.get<Admin>('/admin/auth/me')
    return response.data
  },

  logout: () => {
    clearTokens()
    window.location.href = '/admin/login'
  },
}
