import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, Button, Input, Alert } from '@/shared/ui'
import { StatusBadge, adminReservationApi } from '@/features/reservation'
import { ConsultationTypeLabels, ReservationStatusLabels } from '@/shared/types'
import type { Reservation, ReservationStatus } from '@/shared/types'
import styles from './ReservationList.module.css'

export function AdminReservationListPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  // Filters
  const [status, setStatus] = useState<ReservationStatus | ''>('')
  const [keyword, setKeyword] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const fetchReservations = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params: Record<string, unknown> = {
        page,
        size: 10,
      }
      if (status) params.status = status
      if (keyword) params.keyword = keyword
      if (startDate) params.startDate = startDate
      if (endDate) params.endDate = endDate

      const response = await adminReservationApi.getList(params as Parameters<typeof adminReservationApi.getList>[0])
      setReservations(response.content)
      setTotalPages(response.totalPages)
    } catch (err) {
      setError('예약 목록을 불러오는데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReservations()
  }, [page])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(0)
    fetchReservations()
  }

  const handleReset = () => {
    setStatus('')
    setKeyword('')
    setStartDate('')
    setEndDate('')
    setPage(0)
    fetchReservations()
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>예약 관리</h1>
        <Link to="/admin/reservations/new">
          <Button variant="accent" size="sm">
            + 예약 등록
          </Button>
        </Link>
      </div>

      {error && (
        <Alert variant="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Search/Filter */}
      <Card className="mb-3">
        <CardBody>
          <button type="button" className={styles.filterToggle} onClick={() => setShowFilters(!showFilters)}>
            검색 필터 {showFilters ? '접기' : '열기'}
          </button>

          {showFilters && (
            <form onSubmit={handleSearch} className={styles.filterForm}>
              <div className={styles.filterRow}>
                <Input
                  placeholder="고객명/연락처 검색"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>

              <div className={styles.filterRow}>
                <select
                  className={styles.select}
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ReservationStatus | '')}
                >
                  <option value="">전체 상태</option>
                  {Object.entries(ReservationStatusLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterRow}>
                <div className={styles.dateRange}>
                  <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  <span className={styles.dateSeparator}>~</span>
                  <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>

              <div className={styles.filterActions}>
                <Button type="button" variant="outline" size="sm" onClick={handleReset}>
                  초기화
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  검색
                </Button>
              </div>
            </form>
          )}
        </CardBody>
      </Card>

      {/* Reservation List */}
      {isLoading ? (
        <div className={styles.loading}>로딩 중...</div>
      ) : reservations.length === 0 ? (
        <div className={styles.empty}>예약이 없습니다.</div>
      ) : (
        <div className={styles.list}>
          {reservations.map((reservation) => (
            <Link
              key={reservation.id}
              to={`/admin/reservations/${reservation.id}`}
              className={styles.card}
            >
              <div className={styles.cardHeader}>
                <span className={styles.reservationId}>#{reservation.id}</span>
                <StatusBadge status={reservation.status} />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.customerName}>{reservation.customerName}</div>
                <div className={styles.details}>
                  <span>{formatDate(reservation.reservationDate)} {reservation.reservationTime}</span>
                  <span>{ConsultationTypeLabels[reservation.consultationType]}</span>
                </div>
                <div className={styles.phone}>{reservation.customerPhone}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            이전
          </Button>
          <span className={styles.pageInfo}>
            {page + 1} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  )
}
