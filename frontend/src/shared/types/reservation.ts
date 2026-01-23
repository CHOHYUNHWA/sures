export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'

export type ConsultationType =
  | 'TAX_RETURN'
  | 'TAX_CONSULTATION'
  | 'BOOKKEEPING'
  | 'BUSINESS_REGISTRATION'
  | 'OTHER'

export const ConsultationTypeLabels: Record<ConsultationType, string> = {
  TAX_RETURN: '세금신고',
  TAX_CONSULTATION: '세무상담',
  BOOKKEEPING: '기장대리',
  BUSINESS_REGISTRATION: '사업자등록',
  OTHER: '기타',
}

export const ReservationStatusLabels: Record<ReservationStatus, string> = {
  PENDING: '대기',
  CONFIRMED: '확정',
  COMPLETED: '완료',
  CANCELLED: '취소',
  NO_SHOW: '노쇼',
}

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

export interface VerifyReservationResponse {
  verified: boolean
  reservation?: Reservation
}

export interface ReservationListParams {
  page?: number
  size?: number
  status?: ReservationStatus
  startDate?: string
  endDate?: string
  keyword?: string
}

export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}
