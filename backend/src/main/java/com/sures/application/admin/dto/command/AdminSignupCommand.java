package com.sures.application.admin.dto.command;

/**
 * 관리자 회원가입 Command (Application Layer 입력 DTO)
 */
public record AdminSignupCommand(
        String username,
        String password,
        String passwordConfirm,
        String name,
        String email
) {
    public boolean isPasswordMatching() {
        return password != null && password.equals(passwordConfirm);
    }
}
