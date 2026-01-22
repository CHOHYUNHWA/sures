package com.sures.application.customer.dto.command;

import com.sures.domain.reservation.ConsultationType;

/**
 * 고객 예약 수정 Command (Application Layer 입력 DTO)
 * - 고객은 이메일, 상담유형, 메모만 수정 가능
 */
public record CustomerUpdateReservationCommand(
        String email,
        ConsultationType consultationType,
        String memo
) {}
