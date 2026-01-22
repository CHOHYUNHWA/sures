package com.sures.presentation.admin.dto.response;

import com.sures.application.admin.dto.result.ReservationResult;
import com.sures.domain.reservation.ConsultationType;
import com.sures.domain.reservation.ReservationStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record ReservationResponse(
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
     * Result → Response 변환
     */
    public static ReservationResponse from(ReservationResult result) {
        return new ReservationResponse(
                result.id(),
                result.reservationNumber(),
                result.customerName(),
                result.phone(),
                result.email(),
                result.reservationDate(),
                result.reservationTime(),
                result.consultationType(),
                result.status(),
                result.memo(),
                result.adminId(),
                result.createdAt(),
                result.updatedAt()
        );
    }
}
