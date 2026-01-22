package com.sures.presentation.customer.controller;

import com.sures.application.customer.dto.result.CustomerReservationResult;
import com.sures.application.customer.service.CustomerReservationService;
import com.sures.presentation.common.dto.ApiResponse;
import com.sures.presentation.customer.dto.request.CustomerReservationCreateRequest;
import com.sures.presentation.customer.dto.request.CustomerReservationUpdateRequest;
import com.sures.presentation.customer.dto.request.CustomerReservationVerifyRequest;
import com.sures.presentation.customer.dto.response.CustomerReservationResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

/**
 * 고객 예약 REST API Controller
 */
@RestController
@RequestMapping("/api/customer/reservations")
@RequiredArgsConstructor
public class CustomerReservationController {

    private final CustomerReservationService reservationService;

    /**
     * 예약 신청
     */
    @PostMapping
    public ResponseEntity<ApiResponse<CustomerReservationResponse>> create(
            @Valid @RequestBody CustomerReservationCreateRequest request
    ) {
        CustomerReservationResult result = reservationService.createReservation(request.toCommand());
        CustomerReservationResponse response = CustomerReservationResponse.from(result);
        return ResponseEntity.ok(ApiResponse.success(response, "예약이 완료되었습니다. 예약번호: " + response.reservationNumber()));
    }

    /**
     * 예약 조회 (본인 인증)
     */
    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<CustomerReservationResponse>> verify(
            @Valid @RequestBody CustomerReservationVerifyRequest request
    ) {
        CustomerReservationResult result = reservationService.verifyAndGetReservation(request.toCommand());
        CustomerReservationResponse response = CustomerReservationResponse.from(result);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 예약 상세 조회
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CustomerReservationResponse>> getById(@PathVariable Long id) {
        CustomerReservationResult result = reservationService.getReservation(id);
        CustomerReservationResponse response = CustomerReservationResponse.from(result);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 예약 내용 수정 (메모, 상담유형, 이메일만 변경 가능)
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CustomerReservationResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody CustomerReservationUpdateRequest request
    ) {
        CustomerReservationResult result = reservationService.updateReservation(id, request.toCommand());
        CustomerReservationResponse response = CustomerReservationResponse.from(result);
        return ResponseEntity.ok(ApiResponse.success(response, "예약 정보가 수정되었습니다."));
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
     * 특정 날짜의 예약된 시간 목록 조회
     */
    @GetMapping("/reserved-times")
    public ResponseEntity<ApiResponse<List<String>>> getReservedTimes(@RequestParam LocalDate date) {
        List<String> times = reservationService.getReservedTimes(date)
                .stream()
                .map(time -> time.toString().substring(0, 5))
                .toList();
        return ResponseEntity.ok(ApiResponse.success(times));
    }
}
