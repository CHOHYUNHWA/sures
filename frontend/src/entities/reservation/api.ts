import { apiClient } from '@/shared/api'
import type {
  Reservation,
  CreateReservationRequest,
  UpdateReservationRequest,
  VerifyReservationRequest
} from '@/shared/types'

export const reservationApi = {
  // Customer APIs
  create: (data: CreateReservationRequest) =>
    apiClient.post<Reservation>('/customer/reservations', data),

  verify: (data: VerifyReservationRequest) =>
    apiClient.post<Reservation>('/customer/reservations/verify', data),

  getById: (id: number) =>
    apiClient.get<Reservation>(`/customer/reservations/${id}`),

  updateCustomer: (id: number, data: UpdateReservationRequest) =>
    apiClient.put<Reservation>(`/customer/reservations/${id}`, data),

  cancelCustomer: (id: number) =>
    apiClient.delete(`/customer/reservations/${id}`),

  // Admin APIs
  getAll: (params?: Record<string, string>) =>
    apiClient.get<Reservation[]>('/admin/reservations', { params }),

  getByIdAdmin: (id: number) =>
    apiClient.get<Reservation>(`/admin/reservations/${id}`),

  createAdmin: (data: CreateReservationRequest) =>
    apiClient.post<Reservation>('/admin/reservations', data),

  updateAdmin: (id: number, data: UpdateReservationRequest) =>
    apiClient.put<Reservation>(`/admin/reservations/${id}`, data),

  cancelAdmin: (id: number) =>
    apiClient.delete(`/admin/reservations/${id}`),

  updateStatus: (id: number, status: string) =>
    apiClient.patch(`/admin/reservations/${id}/status`, { status }),
}
