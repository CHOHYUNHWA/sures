package com.sures.domain.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AdminRole {
    SUPER_ADMIN("최고관리자"),
    ADMIN("관리자");

    private final String description;

    public boolean isSuperAdmin() {
        return this == SUPER_ADMIN;
    }
}