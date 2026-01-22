package com.sures.application.admin.dto.command;

import com.sures.domain.reservation.ConsultationType;
import com.sures.domain.reservation.Reservation;
import com.sures.domain.reservation.ReservationStatus;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * 예약 생성 Command (Application Layer 입력 DTO)
 */
public record CreateReservationCommand(
        String customerName,
        String phone,
        String email,
        LocalDate reservationDate,
        LocalTime reservationTime,
        ConsultationType consultationType,
        String memo
) {
    /**
     * Command → Entity 변환
     */
    public Reservation toEntity(Long adminId) {
        return Reservation.builder()
                .customerName(customerName)
                .phone(phone)
                .email(email)
                .reservationDate(reservationDate)
                .reservationTime(reservationTime)
                .consultationType(consultationType)
                .memo(memo)
                .adminId(adminId)
                .status(ReservationStatus.PENDING)
                .build();
    }
}
