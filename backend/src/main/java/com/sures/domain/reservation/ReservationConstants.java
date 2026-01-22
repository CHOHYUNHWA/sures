package com.sures.domain.reservation;

import java.time.LocalTime;
import java.util.List;

/**
 * 예약 관련 상수
 */
public final class ReservationConstants {

    private ReservationConstants() {
        // 인스턴스화 방지
    }

    /**
     * 예약 가능 시간대 (1시간 단위)
     * 운영시간: 09:00~18:00, 점심시간(12:00~13:00) 제외
     */
    public static final List<LocalTime> AVAILABLE_TIMES = List.of(
            LocalTime.of(9, 0),
            LocalTime.of(10, 0),
            LocalTime.of(11, 0),
            LocalTime.of(13, 0),
            LocalTime.of(14, 0),
            LocalTime.of(15, 0),
            LocalTime.of(16, 0),
            LocalTime.of(17, 0)
    );

    /**
     * 오전 예약 시작 시간
     */
    public static final LocalTime MORNING_START = LocalTime.of(9, 0);

    /**
     * 오전 예약 종료 시간
     */
    public static final LocalTime MORNING_END = LocalTime.of(12, 0);

    /**
     * 오후 예약 시작 시간
     */
    public static final LocalTime AFTERNOON_START = LocalTime.of(13, 0);

    /**
     * 오후 예약 종료 시간
     */
    public static final LocalTime AFTERNOON_END = LocalTime.of(18, 0);

    /**
     * 오후 예약 취소/수정 마감 시간 (당일 정오)
     */
    public static final LocalTime AFTERNOON_CANCEL_DEADLINE = LocalTime.of(12, 0);

    /**
     * 1인당 최대 활성 예약 수
     */
    public static final int MAX_ACTIVE_RESERVATIONS_PER_CUSTOMER = 1;
}
