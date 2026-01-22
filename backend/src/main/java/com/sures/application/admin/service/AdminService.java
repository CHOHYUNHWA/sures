package com.sures.application.admin.service;

import com.sures.application.admin.dto.command.AdminSignupCommand;
import com.sures.application.admin.dto.result.AdminResult;
import com.sures.domain.admin.Admin;
import com.sures.domain.admin.AdminDomainService;
import com.sures.domain.admin.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 관리자 Service
 * - 트랜잭션 관리
 * - Command → Domain 변환
 * - Domain → Result 변환
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminService {

    private final AdminRepository adminRepository;
    private final AdminDomainService adminDomainService;
    private final PasswordEncoder passwordEncoder;

    /**
     * 관리자 회원가입
     */
    @Transactional
    public AdminResult signup(AdminSignupCommand command) {
        // 비밀번호 확인 검증
        adminDomainService.validatePasswordMatching(command.password(), command.passwordConfirm());

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(command.password());

        // Admin 생성 (도메인 서비스에서 중복 검증 수행)
        Admin admin = adminDomainService.createAdmin(
                command.username(),
                encodedPassword,
                command.name(),
                command.email()
        );

        Admin savedAdmin = adminRepository.save(admin);
        return AdminResult.from(savedAdmin);
    }

    /**
     * 관리자 조회 (username)
     */
    public AdminResult findByUsername(String username) {
        Admin admin = adminDomainService.getByUsername(username);
        return AdminResult.from(admin);
    }
}
