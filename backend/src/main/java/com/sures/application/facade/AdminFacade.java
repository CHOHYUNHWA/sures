package com.sures.application.facade;

import com.sures.domain.entity.Admin;
import com.sures.domain.repository.AdminRepository;
import com.sures.domain.service.AdminDomainService;
import com.sures.presentation.admin.dto.AdminSignupRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 관리자 Application Facade
 * - 트랜잭션 관리
 * - DTO ↔ Domain 변환
 * - Domain Service 조합
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminFacade {

    private final AdminRepository adminRepository;
    private final AdminDomainService adminDomainService;
    private final PasswordEncoder passwordEncoder;

    /**
     * 관리자 회원가입
     */
    @Transactional
    public Long signup(AdminSignupRequest request) {
        // 비밀번호 확인 검증
        adminDomainService.validatePasswordMatching(request.password(), request.passwordConfirm());

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(request.password());

        // Admin 생성 (도메인 서비스에서 중복 검증 수행)
        Admin admin = adminDomainService.createAdmin(
                request.username(),
                encodedPassword,
                request.name(),
                request.email()
        );

        Admin savedAdmin = adminRepository.save(admin);
        return savedAdmin.getId();
    }

    /**
     * 관리자 조회 (username)
     */
    public Admin findByUsername(String username) {
        return adminDomainService.getByUsername(username);
    }
}
