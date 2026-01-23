package com.sures.presentation.admin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sures.application.admin.dto.result.AdminResult;
import com.sures.application.admin.service.AdminService;
import com.sures.infrastructure.security.jwt.JwtTokenProvider;
import com.sures.presentation.admin.dto.request.AdminSignupRequest;
import com.sures.presentation.admin.dto.request.LoginRequest;
import com.sures.presentation.admin.dto.request.RefreshTokenRequest;
import com.sures.presentation.admin.dto.response.AdminInfoResponse;
import com.sures.presentation.admin.dto.response.LoginResponse;
import com.sures.presentation.admin.dto.response.TokenResponse;
import com.sures.presentation.common.dto.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * 관리자 인증 REST API Controller
 */
@RestController
@RequestMapping("/api/admin/auth")
@RequiredArgsConstructor
public class AdminRestAuthController {

    private final AdminService adminService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 관리자 로그인
     * POST /api/admin/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        // 인증 수행
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        // 인증 정보 설정
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // JWT 토큰 생성
        String accessToken = jwtTokenProvider.createAccessToken(request.username());
        String refreshToken = jwtTokenProvider.createRefreshToken(request.username());

        // 관리자 정보 조회
        AdminResult adminResult = adminService.findByUsername(request.username());
        AdminInfoResponse adminInfo = AdminInfoResponse.from(adminResult);

        // 응답 생성
        LoginResponse response = LoginResponse.of(accessToken, refreshToken, adminInfo);

        return ResponseEntity.ok(ApiResponse.success(response, "로그인 성공"));
    }

    /**
     * 관리자 회원가입
     * POST /api/admin/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AdminInfoResponse>> register(@Valid @RequestBody AdminSignupRequest request) {
        AdminResult adminResult = adminService.signup(request.toCommand());
        AdminInfoResponse response = AdminInfoResponse.from(adminResult);

        return ResponseEntity.ok(ApiResponse.success(response, "회원가입 성공"));
    }

    /**
     * 현재 로그인 정보 조회
     * GET /api/admin/auth/me
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<AdminInfoResponse>> getMe() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        AdminResult adminResult = adminService.findByUsername(username);
        AdminInfoResponse response = AdminInfoResponse.from(adminResult);

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 액세스 토큰 갱신
     * POST /api/admin/auth/refresh
     */
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<TokenResponse>> refresh(@Valid @RequestBody RefreshTokenRequest request) {
        String refreshToken = request.refreshToken();

        // 리프레시 토큰 검증
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            return ResponseEntity.status(401)
                    .body(ApiResponse.error("INVALID_TOKEN", "유효하지 않거나 만료된 리프레시 토큰입니다"));
        }

        // 토큰에서 username 추출
        String username = jwtTokenProvider.getUsername(refreshToken);

        // 사용자 존재 여부 확인
        AdminResult adminResult = adminService.findByUsername(username);
        if (adminResult == null) {
            return ResponseEntity.status(401)
                    .body(ApiResponse.error("USER_NOT_FOUND", "사용자를 찾을 수 없습니다"));
        }

        // 새 액세스 토큰 발급
        String newAccessToken = jwtTokenProvider.createAccessToken(username);

        TokenResponse response = TokenResponse.accessOnly(newAccessToken);

        return ResponseEntity.ok(ApiResponse.success(response, "토큰 갱신 성공"));
    }
}
