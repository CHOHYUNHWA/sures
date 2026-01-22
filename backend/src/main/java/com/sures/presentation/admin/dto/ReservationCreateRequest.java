package com.sures.presentation.admin.dto;

import com.sures.domain.entity.ConsultationType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;

public record ReservationCreateRequest(
        @NotBlank(message = "고객명을 입력해주세요")
        @Size(min = 2, max = 50, message = "고객명은 2~50자로 입력해주세요")
        String customerName,

        @NotBlank(message = "연락처를 입력해주세요")
        @Pattern(regexp = "^010-\\d{4}-\\d{4}$", message = "연락처는 010-0000-0000 형식으로 입력해주세요")
        String phone,

        @Email(message = "올바른 이메일 형식이 아닙니다")
        String email,

        @NotNull(message = "상담일을 선택해주세요")
        LocalDate reservationDate,

        @NotNull(message = "상담시간을 선택해주세요")
        LocalTime reservationTime,

        @NotNull(message = "상담유형을 선택해주세요")
        ConsultationType consultationType,

        @Size(max = 500, message = "메모는 500자 이내로 입력해주세요")
        String memo
) {}