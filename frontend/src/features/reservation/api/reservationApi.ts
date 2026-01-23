import { api } from '@/shared/api'
import type {
  Reservation,
  CreateReservationRequest,
  UpdateReservationRequest,
  ReservationStatus,
  ReservationListParams,
  PageResponse,
  VerifyReservationRequest,
  VerifyReservationResponse,
} from '@/shared/types'

// Admin Reservation API
export const adminReservationApi = {
  getList: async (params?: ReservationListParams): Promise<PageResponse<Reservation>> => {
    const response = await api.get<PageResponse<Reservation>>('/admin/reservations', { params })
    return response.data
  },

  getById: async (id: number): Promise<Reservation> => {
    const response = await api.get<Reservation>(`/admin/reservations/${id}`)
    return response.data
  },

  create: async (data: CreateReservationRequest): Promise<Reservation> => {
    const response = await api.post<Reservation>('/admin/reservations', data)
    return response.data
  },

  update: async (id: number, data: UpdateReservationRequest): Promise<Reservation> => {
    const response = await api.put<Reservation>(`/admin/reservations/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete<void>(`/admin/reservations/${id}`)
  },

  updateStatus: async (id: number, status: ReservationStatus): Promise<Reservation> => {
    const response = await api.patch<Reservation>(`/admin/reservations/${id}/status`, { status })
    return response.data
  },

  getReservedTimes: async (date: string): Promise<string[]> => {
    const response = await api.get<string[]>('/admin/reservations/reserved-times', {
      params: { date },
    })
    return response.data
  },
}

// Customer Reservation API
export const customerReservationApi = {
  create: async (data: CreateReservationRequest): Promise<Reservation> => {
    const response = await api.post<Reservation>('/customer/reservations', data)
    return response.data
  },

  verify: async (data: VerifyReservationRequest): Promise<VerifyReservationResponse> => {
    const response = await api.post<VerifyReservationResponse>('/customer/reservations/verify', data)
    return response.data
  },

  getById: async (id: number): Promise<Reservation> => {
    const response = await api.get<Reservation>(`/customer/reservations/${id}`)
    return response.data
  },

  update: async (id: number, data: UpdateReservationRequest): Promise<Reservation> => {
    const response = await api.put<Reservation>(`/customer/reservations/${id}`, data)
    return response.data
  },

  cancel: async (id: number): Promise<void> => {
    await api.delete<void>(`/customer/reservations/${id}`)
  },

  getReservedTimes: async (date: string): Promise<string[]> => {
    const response = await api.get<string[]>('/customer/reservations/reserved-times', {
      params: { date },
    })
    return response.data
  },
}
