package com.sures.application.facade;

import com.sures.domain.entity.Reservation;
import com.sures.domain.repository.CustomerReservationRepository;
import com.sures.domain.service.ReservationDomainService;
import com.sures.presentation.customer.dto.CustomerReservationCreateRequest;
import com.sures.presentation.customer.dto.CustomerReservationResponse;
import com.sures.presentation.customer.dto.CustomerReservationUpdateRequest;
import com.sures.presentation.customer.dto.CustomerReservationVerifyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

/**
 * 고객 예약 Application Facade
 * - 트랜잭션 관리
 * - DTO ↔ Domain 변환
 * - Domain Service 조합
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CustomerReservationFacade {

    private final CustomerReservationRepository reservationRepository;
    private final ReservationDomainService reservationDomainService;

    /**
     * 예약 신청
     */
    @Transactional
    public Long createReservation(CustomerReservationCreateRequest request) {
        Reservation reservation = reservationDomainService.createReservation(
                request.customerName(),
                request.phone(),
                request.email(),
                request.reservationDate(),
                request.reservationTime(),
                request.consultationType(),
                request.memo(),
                null  // 고객 예약은 adminId 없음
        );

        Reservation saved = reservationRepository.save(reservation);
        return saved.getId();
    }

    /**
     * 예약 조회 (본인 인증)
     */
    public CustomerReservationResponse verifyAndGetReservation(CustomerReservationVerifyRequest request) {
        Reservation reservation = reservationRepository.findByCustomerVerification(
                        request.customerName(),
                        request.phone(),
                        request.reservationNumber()
                )
                .orElseThrow(() -> new IllegalArgumentException("예약 정보를 찾을 수 없습니다. 입력 정보를 확인해주세요."));
        return CustomerReservationResponse.from(reservation);
    }

    /**
     * 예약 단건 조회
     */
    public CustomerReservationResponse getReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다."));
        return CustomerReservationResponse.from(reservation);
    }

    /**
     * 예약번호로 조회
     */
    public CustomerReservationResponse getReservationByNumber(String reservationNumber) {
        Reservation reservation = reservationRepository.findByReservationNumber(reservationNumber)
                .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다."));
        return CustomerReservationResponse.from(reservation);
    }

    /**
     * 예약 내용 수정 (메모, 상담유형, 이메일만 변경 가능)
     */
    @Transactional
    public void updateReservation(Long id, CustomerReservationUpdateRequest request) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다."));

        // 취소된 예약은 수정 불가
        if (reservation.getStatus().name().equals("CANCELLED")) {
            throw new IllegalArgumentException("취소된 예약은 수정할 수 없습니다.");
        }

        // 이메일 수정
        if (request.email() != null) {
            reservation.update(
                    reservation.getCustomerName(),
                    reservation.getPhone(),
                    request.email(),
                    reservation.getReservationDate(),
                    reservation.getReservationTime(),
                    reservation.getConsultationType(),
                    reservation.getMemo()
            );
        }

        // 상담유형 수정
        if (request.consultationType() != null) {
            reservation.updateConsultationType(request.consultationType());
        }

        // 메모 수정
        if (request.memo() != null) {
            reservation.updateMemo(request.memo());
        }
    }

    /**
     * 예약 취소
     */
    @Transactional
    public void cancelReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다."));

        // 이미 취소된 예약
        if (reservation.getStatus().name().equals("CANCELLED")) {
            throw new IllegalArgumentException("이미 취소된 예약입니다.");
        }

        // 완료된 예약은 취소 불가
        if (reservation.getStatus().name().equals("COMPLETED")) {
            throw new IllegalArgumentException("완료된 예약은 취소할 수 없습니다.");
        }

        // 취소 마감 시간 체크
        reservationDomainService.validateCanCancel(reservation);

        reservation.cancel();
    }

    /**
     * 특정 날짜의 예약된 시간 목록 조회
     */
    public List<LocalTime> getReservedTimes(LocalDate date) {
        return reservationRepository.findReservedTimesByDate(date);
    }
}
