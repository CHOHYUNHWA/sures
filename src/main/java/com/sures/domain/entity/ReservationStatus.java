package com.sures.domain.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ReservationStatus {
    CONFIRMED("확정"),
    COMPLETED("완료"),
    CANCELLED("취소"),
    NO_SHOW("노쇼");

    private final String description;
}