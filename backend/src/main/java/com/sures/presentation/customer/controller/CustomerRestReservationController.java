package com.sures.presentation.customer.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sures.application.customer.dto.result.CustomerReservationResult;
import com.sures.application.customer.service.CustomerReservationService;
import com.sures.presentation.common.dto.ApiResponse;
import com.sures.presentation.customer.dto.request.CustomerReservationCreateRequest;
import com.sures.presentation.customer.dto.request.CustomerReservationUpdateRequest;
import com.sures.presentation.customer.dto.request.CustomerReservationVerifyRequest;
import com.sures.presentation.customer.dto.response.CustomerReservationResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * 고객 예약 REST API Controller
 */
@RestController
@RequestMapping("/api/customer/reservations")
@RequiredArgsConstructor
public class CustomerRestReservationController {

    private final CustomerReservationService customerReservationService;

    /**
     * 예약 신청
     * POST /api/customer/reservations
     */
    @PostMapping
    public ResponseEntity<ApiResponse<CustomerReservationResponse>> createReservation(
            @Valid @RequestBody CustomerReservationCreateRequest request
    ) {
        CustomerReservationResult result = customerReservationService.createReservation(request.toCommand());
        CustomerReservationResponse response = CustomerReservationResponse.from(result);

        return ResponseEntity.ok(ApiResponse.success(response, "예약이 신청되었습니다. 예약번호: " + result.reservationNumber()));
    }

    /**
     * 예약 본인인증 (이름 + 연락처 + 예약번호)
     * POST /api/customer/reservations/verify
     */
    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<CustomerReservationResponse>> verifyReservation(
            @Valid @RequestBody CustomerReservationVerifyRequest request
    ) {
        CustomerReservationResult result = customerReservationService.verifyAndGetReservation(request.toCommand());
        CustomerReservationResponse response = CustomerReservationResponse.from(result);

        return ResponseEntity.ok(ApiResponse.success(response, "예약 조회 성공"));
    }

    /**
     * 예약 상세 조회
     * GET /api/customer/reservations/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CustomerReservationResponse>> getReservation(@PathVariable Long id) {
        CustomerReservationResult result = customerReservationService.getReservation(id);
        CustomerReservationResponse response = CustomerReservationResponse.from(result);

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 예약 수정 (이메일, 상담유형, 메모만 변경 가능)
     * PUT /api/customer/reservations/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CustomerReservationResponse>> updateReservation(
            @PathVariable Long id,
            @Valid @RequestBody CustomerReservationUpdateRequest request
    ) {
        CustomerReservationResult result = customerReservationService.updateReservation(id, request.toCommand());
        CustomerReservationResponse response = CustomerReservationResponse.from(result);

        return ResponseEntity.ok(ApiResponse.success(response, "예약이 수정되었습니다."));
    }

    /**
     * 예약 취소
     * DELETE /api/customer/reservations/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> cancelReservation(@PathVariable Long id) {
        customerReservationService.cancelReservation(id);

        return ResponseEntity.ok(ApiResponse.success("예약이 취소되었습니다."));
    }

    /**
     * 특정 날짜의 예약된 시간 목록 조회
     * GET /api/customer/reservations/reserved-times?date={date}
     */
    @GetMapping("/reserved-times")
    public ResponseEntity<ApiResponse<List<LocalTime>>> getReservedTimes(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        List<LocalTime> reservedTimes = customerReservationService.getReservedTimes(date);

        return ResponseEntity.ok(ApiResponse.success(reservedTimes));
    }
}
