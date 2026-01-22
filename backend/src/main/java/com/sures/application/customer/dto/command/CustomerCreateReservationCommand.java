package com.sures.application.customer.dto.command;

import com.sures.domain.reservation.ConsultationType;
import com.sures.domain.reservation.Reservation;
import com.sures.domain.reservation.ReservationStatus;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * 고객 예약 생성 Command (Application Layer 입력 DTO)
 */
public record CustomerCreateReservationCommand(
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
    public Reservation toEntity() {
        return Reservation.builder()
                .customerName(customerName)
                .phone(phone)
                .email(email)
                .reservationDate(reservationDate)
                .reservationTime(reservationTime)
                .consultationType(consultationType)
                .memo(memo)
                .adminId(null)  // 고객 예약은 adminId 없음
                .status(ReservationStatus.PENDING)
                .build();
    }
}
