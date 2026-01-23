package com.sures.presentation.admin.dto.response;

/**
 * 관리자 로그인 응답 DTO
 */
public record LoginResponse(
        String accessToken,
        String refreshToken,
        AdminInfoResponse adminInfo
) {
    /**
     * 토큰과 관리자 정보로 응답 생성
     */
    public static LoginResponse of(String accessToken, String refreshToken, AdminInfoResponse adminInfo) {
        return new LoginResponse(accessToken, refreshToken, adminInfo);
    }
}
