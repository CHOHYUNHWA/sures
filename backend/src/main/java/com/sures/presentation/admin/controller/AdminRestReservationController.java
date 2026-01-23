package com.sures.presentation.admin.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sures.application.admin.dto.result.AdminResult;
import com.sures.application.admin.dto.result.ReservationResult;
import com.sures.application.admin.service.AdminService;
import com.sures.application.admin.service.ReservationService;
import com.sures.domain.common.PageResult;
import com.sures.domain.reservation.ReservationStatus;
import com.sures.presentation.admin.dto.request.ReservationCreateRequest;
import com.sures.presentation.admin.dto.request.ReservationSearchRequest;
import com.sures.presentation.admin.dto.request.ReservationUpdateRequest;
import com.sures.presentation.admin.dto.response.ReservationResponse;
import com.sures.presentation.common.dto.ApiResponse;
import com.sures.presentation.common.dto.PageResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * 관리자 예약 관리 REST API Controller
 */
@RestController
@RequestMapping("/api/admin/reservations")
@RequiredArgsConstructor
public class AdminRestReservationController {

    private final ReservationService reservationService;
    private final AdminService adminService;

    /**
     * 예약 목록 조회 (페이징, 검색)
     * GET /api/admin/reservations
     */
    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ReservationResponse>>> getReservations(
            @ModelAttribute ReservationSearchRequest request
    ) {
        // 기본값 설정
        ReservationSearchRequest searchRequest = request != null ? request : ReservationSearchRequest.defaultSearch();

        PageResult<ReservationResult> pageResult = reservationService.searchReservations(searchRequest.toCommand());
        PageResponse<ReservationResponse> response = PageResponse.from(pageResult, ReservationResponse::from);

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 예약 등록
     * POST /api/admin/reservations
     */
    @PostMapping
    public ResponseEntity<ApiResponse<ReservationResponse>> createReservation(
            @Valid @RequestBody ReservationCreateRequest request
    ) {
        Long adminId = getCurrentAdminId();
        ReservationResult result = reservationService.createReservation(request.toCommand(), adminId);
        ReservationResponse response = ReservationResponse.from(result);

        return ResponseEntity.ok(ApiResponse.success(response, "예약이 등록되었습니다."));
    }

    /**
     * 예약 상세 조회
     * GET /api/admin/reservations/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ReservationResponse>> getReservation(@PathVariable Long id) {
        ReservationResult result = reservationService.getReservation(id);
        ReservationResponse response = ReservationResponse.from(result);

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 예약 수정
     * PUT /api/admin/reservations/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ReservationResponse>> updateReservation(
            @PathVariable Long id,
            @Valid @RequestBody ReservationUpdateRequest request
    ) {
        ReservationResult result = reservationService.updateReservation(id, request.toCommand());
        ReservationResponse response = ReservationResponse.from(result);

        return ResponseEntity.ok(ApiResponse.success(response, "예약이 수정되었습니다."));
    }

    /**
     * 예약 삭제 (취소)
     * DELETE /api/admin/reservations/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteReservation(@PathVariable Long id) {
        reservationService.cancelReservation(id);

        return ResponseEntity.ok(ApiResponse.success("예약이 취소되었습니다."));
    }

    /**
     * 예약 상태 변경
     * PATCH /api/admin/reservations/{id}/status
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Void>> updateStatus(
            @PathVariable Long id,
            @RequestParam ReservationStatus status
    ) {
        switch (status) {
            case CONFIRMED -> reservationService.confirmReservation(id);
            case COMPLETED -> reservationService.completeReservation(id);
            case CANCELLED -> reservationService.cancelReservation(id);
            case NO_SHOW -> reservationService.markNoShow(id);
            default -> throw new IllegalArgumentException("지원하지 않는 상태입니다: " + status);
        }

        return ResponseEntity.ok(ApiResponse.success("예약 상태가 변경되었습니다."));
    }

    /**
     * 특정 날짜의 예약된 시간 목록 조회
     * GET /api/admin/reservations/reserved-times?date={date}
     */
    @GetMapping("/reserved-times")
    public ResponseEntity<ApiResponse<List<LocalTime>>> getReservedTimes(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        List<LocalTime> reservedTimes = reservationService.getReservedTimes(date);

        return ResponseEntity.ok(ApiResponse.success(reservedTimes));
    }

    /**
     * 현재 로그인한 관리자 ID 조회
     */
    private Long getCurrentAdminId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        AdminResult adminResult = adminService.findByUsername(username);
        return adminResult.id();
    }
}
