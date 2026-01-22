package com.sures.domain.reservation;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ReservationStatus {
    PENDING("대기"),
    CONFIRMED("확정"),
    COMPLETED("완료"),
    CANCELLED("취소"),
    NO_SHOW("노쇼");

    private final String description;
}
