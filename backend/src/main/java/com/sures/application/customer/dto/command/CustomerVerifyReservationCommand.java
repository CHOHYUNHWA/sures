package com.sures.application.customer.dto.command;

/**
 * 고객 예약 인증 Command (Application Layer 입력 DTO)
 */
public record CustomerVerifyReservationCommand(
        String customerName,
        String phone,
        String reservationNumber
) {}
