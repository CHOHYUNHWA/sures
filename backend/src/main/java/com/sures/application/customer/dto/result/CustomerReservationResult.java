package com.sures.application.customer.dto.result;

import com.sures.domain.reservation.ConsultationType;
import com.sures.domain.reservation.Reservation;
import com.sures.domain.reservation.ReservationStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * 고객 예약 Result (Application Layer 출력 DTO)
 */
public record CustomerReservationResult(
        Long id,
        String reservationNumber,
        String customerName,
        String phone,
        String email,
        LocalDate reservationDate,
        LocalTime reservationTime,
        ConsultationType consultationType,
        ReservationStatus status,
        String memo,
        LocalDateTime createdAt
) {
    /**
     * Entity → Result 변환
     */
    public static CustomerReservationResult from(Reservation entity) {
        return new CustomerReservationResult(
                entity.getId(),
                entity.getReservationNumber(),
                entity.getCustomerName(),
                entity.getPhone(),
                entity.getEmail(),
                entity.getReservationDate(),
                entity.getReservationTime(),
                entity.getConsultationType(),
                entity.getStatus(),
                entity.getMemo(),
                entity.getCreatedAt()
        );
    }
}
