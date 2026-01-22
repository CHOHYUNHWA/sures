package com.sures.presentation.customer.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * 고객 예약 조회 인증 요청 DTO
 * 이름 + 전화번호 + 예약번호로 본인 확인
 */
public record CustomerReservationVerifyRequest(
        @NotBlank(message = "고객명을 입력해주세요")
        @Size(min = 2, max = 50, message = "고객명은 2~50자로 입력해주세요")
        String customerName,

        @NotBlank(message = "연락처를 입력해주세요")
        @Pattern(regexp = "^010-\\d{4}-\\d{4}$", message = "연락처는 010-0000-0000 형식으로 입력해주세요")
        String phone,

        @NotBlank(message = "예약번호를 입력해주세요")
        @Pattern(regexp = "^R\\d{6}$", message = "예약번호는 R000000 형식으로 입력해주세요")
        String reservationNumber
) {}
