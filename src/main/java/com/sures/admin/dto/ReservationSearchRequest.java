package com.sures.admin.dto;

import com.sures.domain.entity.ReservationStatus;

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
}