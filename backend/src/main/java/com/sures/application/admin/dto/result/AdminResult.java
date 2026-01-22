package com.sures.application.admin.dto.result;

import com.sures.domain.admin.Admin;
import com.sures.domain.admin.AdminRole;

import java.time.LocalDateTime;

/**
 * 관리자 Result (Application Layer 출력 DTO)
 */
public record AdminResult(
        Long id,
        String username,
        String name,
        String email,
        AdminRole role,
        LocalDateTime createdAt
) {
    /**
     * Entity → Result 변환
     */
    public static AdminResult from(Admin entity) {
        return new AdminResult(
                entity.getId(),
                entity.getUsername(),
                entity.getName(),
                entity.getEmail(),
                entity.getRole(),
                entity.getCreatedAt()
        );
    }
}
