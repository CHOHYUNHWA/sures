package com.sures.presentation.admin.dto.request;

import com.sures.application.admin.dto.command.SearchReservationCommand;
import com.sures.domain.reservation.ReservationStatus;

import java.time.LocalDate;

public record ReservationSearchRequest(
        ReservationStatus status,
        LocalDate startDate,
        LocalDate endDate,
        String keyword,
        int page,
        int size
) {
    public ReservationSearchRequest {
        if (page < 0) page = 0;
        if (size <= 0 || size > 100) size = 20;
    }

    public static ReservationSearchRequest defaultSearch() {
        return new ReservationSearchRequest(null, null, null, null, 0, 20);
    }

    /**
     * Request → Command 변환
     */
    public SearchReservationCommand toCommand() {
        return new SearchReservationCommand(status, startDate, endDate, keyword, page, size);
    }
}
