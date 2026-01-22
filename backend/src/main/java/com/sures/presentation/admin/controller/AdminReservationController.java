package com.sures.presentation.admin.controller;

import com.sures.application.admin.dto.result.ReservationResult;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

/**
 * 관리자 예약 관리 REST API Controller
 */
@RestController
@RequestMapping("/api/admin/reservations")
@RequiredArgsConstructor
public class AdminReservationController {

    private final ReservationService reservationService;

    /**
     * 예약 목록 조회 (검색, 필터, 페이징)
     */
    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ReservationResponse>>> list(
            @RequestParam(required = false) ReservationStatus status,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        ReservationSearchRequest searchRequest = new ReservationSearchRequest(
                status, startDate, endDate, keyword, page, size
        );

        PageResult<ReservationResult> results = reservationService.searchReservations(searchRequest.toCommand());
        PageResponse<ReservationResponse> response = PageResponse.from(results, ReservationResponse::from);

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 예약 상세 조회
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ReservationResponse>> getById(@PathVariable Long id) {
        ReservationResult result = reservationService.getReservation(id);
        ReservationResponse response = ReservationResponse.from(result);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 예약 생성
     */
    @PostMapping
    public ResponseEntity<ApiResponse<ReservationResponse>> create(
            @Valid @RequestBody ReservationCreateRequest request
            // TODO: @AuthenticationPrincipal로 adminId 추출
    ) {
        ReservationResult result = reservationService.createReservation(request.toCommand(), null);
        ReservationResponse response = ReservationResponse.from(result);
        return ResponseEntity.ok(ApiResponse.success(response, "예약이 등록되었습니다."));
    }

    /**
     * 예약 수정
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ReservationResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody ReservationUpdateRequest request
    ) {
        ReservationResult result = reservationService.updateReservation(id, request.toCommand());
        ReservationResponse response = ReservationResponse.from(result);
        return ResponseEntity.ok(ApiResponse.success(response, "예약이 수정되었습니다."));
    }

    /**
     * 예약 취소
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> cancel(@PathVariable Long id) {
        reservationService.cancelReservation(id);
        return ResponseEntity.ok(ApiResponse.success("예약이 취소되었습니다."));
    }

    /**
     * 예약 상태 변경 - 확정
     */
    @PatchMapping("/{id}/status/confirm")
    public ResponseEntity<ApiResponse<Void>> confirm(@PathVariable Long id) {
        reservationService.confirmReservation(id);
        return ResponseEntity.ok(ApiResponse.success("예약이 확정되었습니다."));
    }

    /**
     * 예약 상태 변경 - 완료
     */
    @PatchMapping("/{id}/status/complete")
    public ResponseEntity<ApiResponse<Void>> complete(@PathVariable Long id) {
        reservationService.completeReservation(id);
        return ResponseEntity.ok(ApiResponse.success("상담이 완료 처리되었습니다."));
    }

    /**
     * 예약 상태 변경 - 노쇼
     */
    @PatchMapping("/{id}/status/no-show")
    public ResponseEntity<ApiResponse<Void>> noShow(@PathVariable Long id) {
        reservationService.markNoShow(id);
        return ResponseEntity.ok(ApiResponse.success("노쇼로 처리되었습니다."));
    }

    /**
     * 특정 날짜의 예약된 시간 목록 조회
     */
    @GetMapping("/reserved-times")
    public ResponseEntity<ApiResponse<List<String>>> getReservedTimes(
            @RequestParam LocalDate date,
            @RequestParam(required = false) Long excludeId
    ) {
        List<String> times;
        if (excludeId != null) {
            times = reservationService.getReservedTimesExcluding(date, excludeId)
                    .stream()
                    .map(time -> time.toString().substring(0, 5))
                    .toList();
        } else {
            times = reservationService.getReservedTimes(date)
                    .stream()
                    .map(time -> time.toString().substring(0, 5))
                    .toList();
        }
        return ResponseEntity.ok(ApiResponse.success(times));
    }
}
