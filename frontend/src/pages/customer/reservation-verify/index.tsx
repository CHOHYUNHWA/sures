import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardBody, Button, Input, Alert } from '@/shared/ui'
import { customerReservationApi } from '@/features/reservation'
import styles from './ReservationVerify.module.css'

export function ReservationVerifyPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [reservationId, setReservationId] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')

  // Auto-format phone number
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '')
    if (value.length > 11) value = value.slice(0, 11)

    if (value.length <= 3) {
      setPhone(value)
    } else if (value.length <= 7) {
      setPhone(`${value.slice(0, 3)}-${value.slice(3)}`)
    } else {
      setPhone(`${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!reservationId || !customerName || !phone) {
      setError('모든 항목을 입력해주세요.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await customerReservationApi.verify({
        reservationId: parseInt(reservationId),
        customerName: customerName.trim(),
        customerPhone: phone,
      })

      if (result.verified && result.reservation) {
        navigate(`/customer/reservations/${result.reservation.id}`, {
          state: { reservation: result.reservation },
        })
      } else {
        setError('예약 정보를 찾을 수 없습니다. 입력 정보를 확인해주세요.')
      }
    } catch (err) {
      setError('예약 조회에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="customer-content">
      <h1 className="mb-3">예약 조회</h1>
      <p className={styles.description}>예약 시 입력한 정보로 예약 내역을 조회할 수 있습니다.</p>

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
                label="예약번호 *"
                type="number"
                placeholder="예약번호를 입력하세요"
                value={reservationId}
                onChange={(e) => setReservationId(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <Input
                label="고객명 *"
                placeholder="예약 시 입력한 이름"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <Input
                label="연락처 *"
                type="tel"
                placeholder="010-0000-0000"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>

            <Button type="submit" variant="primary" block loading={isLoading}>
              예약 조회
            </Button>
          </form>
        </CardBody>
      </Card>

      <div className={styles.footer}>
        <Link to="/customer">홈으로 돌아가기</Link>
      </div>
    </div>
  )
}

export { ReservationVerifyPage as CustomerReservationVerifyPage }
