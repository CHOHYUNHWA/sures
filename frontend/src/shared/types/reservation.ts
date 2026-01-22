export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'

export type ConsultationType =
  | 'TAX_RETURN'
  | 'TAX_CONSULTATION'
  | 'BOOKKEEPING'
  | 'BUSINESS_REGISTRATION'
  | 'OTHER'

export interface Reservation {
  id: number
  customerName: string
  customerPhone: string
  customerEmail?: string
  reservationDate: string
  reservationTime: string
  consultationType: ConsultationType
  memo?: string
  status: ReservationStatus
  createdAt: string
  updatedAt: string
}

export interface CreateReservationRequest {
  customerName: string
  customerPhone: string
  customerEmail?: string
  reservationDate: string
  reservationTime: string
  consultationType: ConsultationType
  memo?: string
}

export interface UpdateReservationRequest {
  customerEmail?: string
  consultationType?: ConsultationType
  memo?: string
}

export interface VerifyReservationRequest {
  customerName: string
  customerPhone: string
  reservationId: number
}
