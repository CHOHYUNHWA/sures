package com.sures.presentation.customer.dto.response;

import com.sures.application.customer.dto.result.CustomerReservationResult;
import com.sures.domain.reservation.ConsultationType;
import com.sures.domain.reservation.ReservationStatus;

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
        LocalDateTime createdAt
) {
    /**
     * Result → Response 변환
     */
    public static CustomerReservationResponse from(CustomerReservationResult result) {
        return new CustomerReservationResponse(
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
                result.createdAt()
        );
    }
}
