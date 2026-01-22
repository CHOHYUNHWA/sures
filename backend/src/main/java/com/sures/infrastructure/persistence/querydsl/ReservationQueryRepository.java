package com.sures.infrastructure.persistence.querydsl;

import com.sures.domain.reservation.Reservation;
import com.sures.domain.reservation.ReservationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

/**
 * Reservation QueryDSL Repository 인터페이스
 */
public interface ReservationQueryRepository {

    /**
     * 검색 조건으로 페이징 조회
     */
    Page<Reservation> searchReservations(
            ReservationStatus status,
            LocalDate startDate,
            LocalDate endDate,
            String keyword,
            Pageable pageable
    );
}
