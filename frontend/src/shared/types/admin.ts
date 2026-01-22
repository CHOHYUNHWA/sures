export type AdminRole = 'ADMIN' | 'SUPER_ADMIN'

export interface Admin {
  id: number
  username: string
  name: string
  email: string
  role: AdminRole
  createdAt: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  admin: Admin
}

export interface SignupRequest {
  username: string
  password: string
  passwordConfirm: string
  name: string
  email: string
}
