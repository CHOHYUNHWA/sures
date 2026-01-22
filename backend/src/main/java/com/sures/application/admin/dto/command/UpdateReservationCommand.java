package com.sures.application.admin.dto.command;

import com.sures.domain.reservation.ConsultationType;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * 예약 수정 Command (Application Layer 입력 DTO)
 */
public record UpdateReservationCommand(
        String customerName,
        String phone,
        String email,
        LocalDate reservationDate,
        LocalTime reservationTime,
        ConsultationType consultationType,
        String memo
) {}
