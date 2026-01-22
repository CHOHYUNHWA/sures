package com.sures.presentation.admin.controller;

import com.sures.application.admin.dto.result.AdminResult;
import com.sures.application.admin.service.AdminService;
import com.sures.presentation.admin.dto.request.AdminSignupRequest;
import com.sures.presentation.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 관리자 인증 REST API Controller
 */
@RestController
@RequestMapping("/api/admin/auth")
@RequiredArgsConstructor
public class AdminAuthController {

    private final AdminService adminService;

    /**
     * 회원가입
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Long>> register(@Valid @RequestBody AdminSignupRequest request) {
        // 비밀번호 확인 체크
        if (!request.isPasswordMatching()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("VALIDATION_ERROR", "비밀번호가 일치하지 않습니다."));
        }

        AdminResult result = adminService.signup(request.toCommand());
        return ResponseEntity.ok(ApiResponse.success(result.id(), "회원가입이 완료되었습니다."));
    }

    /**
     * 로그인 (Spring Security에서 처리)
     * - POST /api/admin/auth/login
     * - Body: { "username": "...", "password": "..." }
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Void>> login() {
        // Spring Security에서 처리됨
        // 이 엔드포인트는 문서화 목적으로만 존재
        return ResponseEntity.ok(ApiResponse.success("로그인 성공"));
    }

    /**
     * 로그아웃 (Spring Security에서 처리)
     */
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout() {
        // Spring Security에서 처리됨
        return ResponseEntity.ok(ApiResponse.success("로그아웃 성공"));
    }
}
