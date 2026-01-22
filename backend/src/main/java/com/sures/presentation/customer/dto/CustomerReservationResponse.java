package com.sures.presentation.customer.dto;

import com.sures.domain.entity.ConsultationType;
import com.sures.domain.entity.Reservation;
import com.sures.domain.entity.ReservationStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record CustomerReservationResponse(
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
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static CustomerReservationResponse from(Reservation entity) {
        return new CustomerReservationResponse(
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
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}
