package com.sures.presentation.admin.dto.request;

import jakarta.validation.constraints.NotBlank;

/**
 * 관리자 로그인 요청 DTO
 */
public record LoginRequest(
        @NotBlank(message = "아이디를 입력해주세요")
        String username,

        @NotBlank(message = "비밀번호를 입력해주세요")
        String password
) {
}
