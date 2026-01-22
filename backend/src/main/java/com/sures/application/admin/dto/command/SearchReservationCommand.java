package com.sures.application.admin.dto.command;

import com.sures.domain.reservation.ReservationStatus;

import java.time.LocalDate;

/**
 * 예약 검색 Command (Application Layer 입력 DTO)
 */
public record SearchReservationCommand(
        ReservationStatus status,
        LocalDate startDate,
        LocalDate endDate,
        String keyword,
        int page,
        int size
) {
    public SearchReservationCommand {
        if (page < 0) page = 0;
        if (size <= 0 || size > 100) size = 20;
    }

    public static SearchReservationCommand defaultSearch() {
        return new SearchReservationCommand(null, null, null, null, 0, 20);
    }
}
