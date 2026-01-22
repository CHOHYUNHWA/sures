package com.sures.presentation.customer.dto;

import com.sures.domain.entity.ConsultationType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

/**
 * 고객용 예약 수정 요청 DTO
 * 고객은 메모와 상담유형만 수정 가능 (일시 변경 불가)
 */
public record CustomerReservationUpdateRequest(
        @Email(message = "올바른 이메일 형식이 아닙니다")
        String email,

        ConsultationType consultationType,

        @Size(max = 500, message = "메모는 500자 이내로 입력해주세요")
        String memo
) {}
