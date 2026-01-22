package com.sures.domain.service;

import com.sures.domain.entity.Admin;
import com.sures.domain.repository.AdminRepository;

/**
 * 관리자 도메인 서비스 (순수 비즈니스 로직 - Spring 의존성 없음)
 */
public class AdminDomainService {

    private final AdminRepository adminRepository;

    public AdminDomainService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    /**
     * 아이디 중복 검증
     */
    public void validateUsernameNotDuplicated(String username) {
        if (adminRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }
    }

    /**
     * 이메일 중복 검증
     */
    public void validateEmailNotDuplicated(String email) {
        if (adminRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }
    }

    /**
     * 비밀번호 확인 검증
     */
    public void validatePasswordMatching(String password, String passwordConfirm) {
        if (!password.equals(passwordConfirm)) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
    }

    /**
     * 관리자 생성
     */
    public Admin createAdmin(String username, String encodedPassword, String name, String email) {
        validateUsernameNotDuplicated(username);
        validateEmailNotDuplicated(email);

        return Admin.builder()
                .username(username)
                .password(encodedPassword)
                .name(name)
                .email(email)
                .build();
    }

    /**
     * 관리자 조회 (username)
     */
    public Admin getByUsername(String username) {
        return adminRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 관리자입니다."));
    }
}
