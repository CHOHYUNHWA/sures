import { useLocation, Navigate, Link } from 'react-router-dom'
import { Card, CardBody, Button } from '@/shared/ui'
import { StatusBadge } from '@/features/reservation'
import { ConsultationTypeLabels } from '@/shared/types'
import type { Reservation } from '@/shared/types'
import styles from './ReservationComplete.module.css'

export function ReservationCompletePage() {
  const location = useLocation()
  const reservation = location.state?.reservation as Reservation | undefined

  if (!reservation) {
    return <Navigate to="/customer/reservations/apply" replace />
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

  return (
    <div className="customer-content">
      <div className={styles.successIcon}>
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
      </div>

      <h1 className={styles.title}>예약 신청 완료</h1>
      <p className={styles.subtitle}>예약이 성공적으로 접수되었습니다.</p>

      <Card className="mb-3">
        <CardBody>
          <div className={styles.reservationInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>예약번호</span>
              <span className={styles.infoValue}>{reservation.id}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>상태</span>
              <StatusBadge status={reservation.status} />
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>고객명</span>
              <span className={styles.infoValue}>{reservation.customerName}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>연락처</span>
              <span className={styles.infoValue}>{reservation.customerPhone}</span>
            </div>
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
          </div>
        </CardBody>
      </Card>

      <div className={styles.notice}>
        <p>
          예약 확인 및 변경은 <strong>예약 조회</strong>에서 가능합니다.
        </p>
        <p>예약번호와 등록하신 정보로 조회할 수 있습니다.</p>
      </div>

      <div className="form-actions">
        <Link to="/customer" style={{ flex: 1 }}>
          <Button variant="outline" block>
            홈으로
          </Button>
        </Link>
        <Link to="/customer/reservations/verify" style={{ flex: 1 }}>
          <Button variant="primary" block>
            예약 조회
          </Button>
        </Link>
      </div>
    </div>
  )
}

export { ReservationCompletePage as CustomerReservationCompletePage }
