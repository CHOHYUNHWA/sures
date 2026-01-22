package com.sures.application.admin.dto.result;

import com.sures.domain.reservation.ConsultationType;
import com.sures.domain.reservation.Reservation;
import com.sures.domain.reservation.ReservationStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * 예약 Result (Application Layer 출력 DTO)
 */
public record ReservationResult(
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
        Long adminId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    /**
     * Entity → Result 변환
     */
    public static ReservationResult from(Reservation entity) {
        return new ReservationResult(
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
                entity.getAdminId(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}
