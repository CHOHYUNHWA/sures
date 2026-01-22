package com.sures.infrastructure.persistence.querydsl;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sures.domain.reservation.QReservation;
import com.sures.domain.reservation.Reservation;
import com.sures.domain.reservation.ReservationStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Reservation QueryDSL Repository 구현체
 */
@Repository
@RequiredArgsConstructor
public class ReservationQueryRepositoryImpl implements ReservationQueryRepository {

    private final JPAQueryFactory queryFactory;
    private final QReservation reservation = QReservation.reservation;

    @Override
    public Page<Reservation> searchReservations(
            ReservationStatus status,
            LocalDate startDate,
            LocalDate endDate,
            String keyword,
            Pageable pageable
    ) {
        JPAQuery<Reservation> query = queryFactory
                .selectFrom(reservation)
                .where(
                        statusEq(status),
                        dateBetween(startDate, endDate),
                        keywordContains(keyword)
                )
                .orderBy(reservation.reservationDate.desc(), reservation.reservationTime.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());

        List<Reservation> content = query.fetch();

        Long total = queryFactory
                .select(reservation.count())
                .from(reservation)
                .where(
                        statusEq(status),
                        dateBetween(startDate, endDate),
                        keywordContains(keyword)
                )
                .fetchOne();

        return new PageImpl<>(content, pageable, total != null ? total : 0);
    }

    private BooleanExpression statusEq(ReservationStatus status) {
        return status != null ? reservation.status.eq(status) : null;
    }

    private BooleanExpression dateBetween(LocalDate startDate, LocalDate endDate) {
        if (startDate != null && endDate != null) {
            return reservation.reservationDate.between(startDate, endDate);
        } else if (startDate != null) {
            return reservation.reservationDate.goe(startDate);
        } else if (endDate != null) {
            return reservation.reservationDate.loe(endDate);
        }
        return null;
    }

    private BooleanExpression keywordContains(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return null;
        }
        return reservation.customerName.contains(keyword)
                .or(reservation.phone.contains(keyword))
                .or(reservation.reservationNumber.contains(keyword));
    }
}
