import { useState } from 'react'
import { useLocation, Navigate, Link } from 'react-router-dom'
import { Card, CardBody, Button, Alert, ConfirmModal } from '@/shared/ui'
import { StatusBadge, customerReservationApi } from '@/features/reservation'
import { ConsultationTypeLabels } from '@/shared/types'
import type { Reservation } from '@/shared/types'
import styles from './ReservationDetail.module.css'

export function ReservationDetailPage() {
  const location = useLocation()
  const [reservation, setReservation] = useState<Reservation | undefined>(location.state?.reservation)
  const [error, setError] = useState<string | null>(null)
  const [showCancelModal, setShowCancelModal] = useState(false)

  if (!reservation) {
    return <Navigate to="/customer/reservations/verify" replace />
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const weekdays = ['일', '월', '화', '수', '목', '금', '토']
    const weekday = weekdays[date.getDay()]
    return `${year}년 ${month}월 ${day}일 (${weekday})`
  }

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  }

  const canCancel = () => {
    // 취소 가능 여부 확인
    // PENDING, CONFIRMED 상태만 취소 가능
    if (!['PENDING', 'CONFIRMED'].includes(reservation.status)) {
      return false
    }

    const now = new Date()
    const reservationDate = new Date(reservation.reservationDate)
    const reservationHour = parseInt(reservation.reservationTime.split(':')[0])

    // 오전 예약 (09:00~11:00): 전날 자정까지
    // 오후 예약 (13:00~17:00): 당일 오전 12시까지
    if (reservationHour < 12) {
      // 오전 예약
      const deadline = new Date(reservationDate)
      deadline.setDate(deadline.getDate() - 1)
      deadline.setHours(24, 0, 0, 0)
      return now < deadline
    } else {
      // 오후 예약
      const deadline = new Date(reservationDate)
      deadline.setHours(12, 0, 0, 0)
      return now < deadline
    }
  }

  const handleCancel = async () => {
    setError(null)

    try {
      await customerReservationApi.cancel(reservation.id)
      setReservation({ ...reservation, status: 'CANCELLED' })
      setShowCancelModal(false)
    } catch {
      setError('예약 취소에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const isCancelled = reservation.status === 'CANCELLED'
  const isCompleted = reservation.status === 'COMPLETED'

  return (
    <div className="customer-content">
      <h1 className="mb-3">예약 상세</h1>

      {error && (
        <Alert variant="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Card className="mb-3">
        <CardBody>
          <div className={styles.header}>
            <span className={styles.reservationId}>예약번호: {reservation.id}</span>
            <StatusBadge status={reservation.status} />
          </div>

          <div className={styles.info}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>고객명</span>
              <span className={styles.infoValue}>{reservation.customerName}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>연락처</span>
              <span className={styles.infoValue}>{reservation.customerPhone}</span>
            </div>
            {reservation.customerEmail && (
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>이메일</span>
                <span className={styles.infoValue}>{reservation.customerEmail}</span>
              </div>
            )}
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>예약일</span>
              <span className={styles.infoValue}>{formatDate(reservation.reservationDate)}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>예약시간</span>
              <span className={styles.infoValue}>{reservation.reservationTime}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>상담유형</span>
              <span className={styles.infoValue}>{ConsultationTypeLabels[reservation.consultationType]}</span>
            </div>
            {reservation.memo && (
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>메모</span>
                <span className={styles.infoValue}>{reservation.memo}</span>
              </div>
            )}
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>신청일시</span>
              <span className={styles.infoValue}>{formatDateTime(reservation.createdAt)}</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {!isCancelled && !isCompleted && (
        <div className={styles.notice}>
          <h4>취소 정책 안내</h4>
          <ul>
            <li>오전 예약 (09:00~11:00): 전날 자정까지 취소 가능</li>
            <li>오후 예약 (13:00~17:00): 당일 오전 12시까지 취소 가능</li>
            <li>취소 마감 이후에는 전화 문의 부탁드립니다.</li>
          </ul>
        </div>
      )}

      <div className="form-actions">
        <Link to="/customer" style={{ flex: 1 }}>
          <Button variant="outline" block>
            홈으로
          </Button>
        </Link>
        {canCancel() && (
          <Button variant="danger" onClick={() => setShowCancelModal(true)} style={{ flex: 1 }}>
            예약 취소
          </Button>
        )}
      </div>

      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancel}
        title="예약 취소"
        message="예약을 취소하시겠습니까? 취소 후에는 되돌릴 수 없습니다."
        confirmText="취소하기"
        cancelText="닫기"
        confirmVariant="danger"
      />
    </div>
  )
}

export { ReservationDetailPage as CustomerReservationDetailPage }
