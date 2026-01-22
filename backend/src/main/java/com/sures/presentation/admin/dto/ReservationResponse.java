package com.sures.presentation.admin.dto;

import com.sures.domain.entity.ConsultationType;
import com.sures.domain.entity.Reservation;
import com.sures.domain.entity.ReservationStatus;

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
    public static ReservationResponse from(Reservation entity) {
        return new ReservationResponse(
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