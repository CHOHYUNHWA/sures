import { useState, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardBody, Button, Input, Alert } from '@/shared/ui'
import { DateSelector, TimeGrid, ConsultationTypeGrid, customerReservationApi } from '@/features/reservation'
import type { ConsultationType, CreateReservationRequest } from '@/shared/types'
import styles from './ReservationApply.module.css'

export function ReservationApplyPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reservedTimes, setReservedTimes] = useState<string[]>([])

  // Form state
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [consultationType, setConsultationType] = useState<ConsultationType | null>(null)
  const [memo, setMemo] = useState('')

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({})

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

  // Fetch reserved times when date is selected
  const handleDateSelect = useCallback(async (date: string) => {
    setSelectedDate(date)
    setSelectedTime(null)

    try {
      const times = await customerReservationApi.getReservedTimes(date)
      setReservedTimes(times)
    } catch (err) {
      console.error('시간 조회 실패:', err)
      setReservedTimes([])
    }
  }, [])

  // Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!customerName.trim()) {
      newErrors.customerName = '고객명을 입력해주세요'
    } else if (customerName.length < 2 || customerName.length > 50) {
      newErrors.customerName = '고객명은 2~50자로 입력해주세요'
    }

    const phonePattern = /^010-\d{4}-\d{4}$/
    if (!phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요'
    } else if (!phonePattern.test(phone)) {
      newErrors.phone = '연락처는 010-0000-0000 형식으로 입력해주세요'
    }

    if (email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(email)) {
        newErrors.email = '올바른 이메일 형식이 아닙니다'
      }
    }

    if (!selectedDate) {
      newErrors.date = '상담일을 선택해주세요'
    }

    if (!selectedTime) {
      newErrors.time = '상담시간을 선택해주세요'
    }

    if (!consultationType) {
      newErrors.type = '상담유형을 선택해주세요'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsLoading(true)
    setError(null)

    try {
      const request: CreateReservationRequest = {
        customerName: customerName.trim(),
        customerPhone: phone,
        customerEmail: email || undefined,
        reservationDate: selectedDate!,
        reservationTime: selectedTime!,
        consultationType: consultationType!,
        memo: memo || undefined,
      }

      const reservation = await customerReservationApi.create(request)
      navigate('/customer/reservations/complete', { state: { reservation } })
    } catch (err) {
      setError('예약 신청에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="customer-content">
      <h1 className="mb-3">예약 신청</h1>

      {error && (
        <Alert variant="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* 고객 정보 */}
        <Card className="mb-3">
          <CardBody>
            <div className="section-title">고객 정보</div>

            <div className={styles.formGroup}>
              <Input
                label="고객명 *"
                placeholder="고객명 (2~50자)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                error={errors.customerName}
              />
            </div>

            <div className={styles.formGroup}>
              <Input
                label="연락처 *"
                type="tel"
                placeholder="010-0000-0000"
                value={phone}
                onChange={handlePhoneChange}
                error={errors.phone}
              />
            </div>

            <div className={styles.formGroup} style={{ marginBottom: 0 }}>
              <Input
                label="이메일 (선택)"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
            </div>
          </CardBody>
        </Card>

        {/* 예약 일시 */}
        <Card className="mb-3">
          <CardBody>
            <div className="section-title">예약 일시</div>

            <div className={styles.formGroup}>
              <label className={styles.label}>상담일 *</label>
              <DateSelector selectedDate={selectedDate} onSelect={handleDateSelect} />
              {errors.date && <span className={styles.error}>{errors.date}</span>}
            </div>

            <div className={styles.formGroup} style={{ marginBottom: 0 }}>
              <label className={styles.label}>상담시간 *</label>
              <TimeGrid
                selectedTime={selectedTime}
                reservedTimes={reservedTimes}
                selectedDate={selectedDate}
                onSelect={setSelectedTime}
              />
              {errors.time && <span className={styles.error}>{errors.time}</span>}
            </div>
          </CardBody>
        </Card>

        {/* 상담 정보 */}
        <Card className="mb-3">
          <CardBody>
            <div className="section-title">상담 정보</div>

            <div className={styles.formGroup}>
              <label className={styles.label}>상담 유형 *</label>
              <ConsultationTypeGrid selectedType={consultationType} onSelect={setConsultationType} />
              {errors.type && <span className={styles.error}>{errors.type}</span>}
            </div>

            <div className={styles.formGroup} style={{ marginBottom: 0 }}>
              <label className={styles.label} htmlFor="memo">
                메모 (선택)
              </label>
              <textarea
                id="memo"
                className={styles.textarea}
                placeholder="상담 관련 메모를 입력하세요 (최대 500자)"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                rows={3}
                maxLength={500}
              />
            </div>
          </CardBody>
        </Card>

        {/* 버튼 */}
        <div className="form-actions">
          <Link to="/customer" style={{ flex: 1 }}>
            <Button type="button" variant="outline" block>
              취소
            </Button>
          </Link>
          <Button type="submit" variant="primary" loading={isLoading} style={{ flex: 2 }}>
            예약 신청
          </Button>
        </div>
      </form>
    </div>
  )
}

export { ReservationApplyPage as CustomerReservationApplyPage }
