package com.sures.presentation.admin.dto.response;

import com.sures.application.admin.dto.result.AdminResult;
import com.sures.domain.admin.AdminRole;

/**
 * 관리자 정보 응답 DTO
 */
public record AdminInfoResponse(
        Long id,
        String username,
        String name,
        String email,
        AdminRole role
) {
    /**
     * AdminResult -> AdminInfoResponse 변환
     */
    public static AdminInfoResponse from(AdminResult result) {
        return new AdminInfoResponse(
                result.id(),
                result.username(),
                result.name(),
                result.email(),
                result.role()
        );
    }
}
