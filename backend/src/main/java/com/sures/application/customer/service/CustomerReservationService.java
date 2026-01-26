package com.sures.application.customer.service;

import com.sures.application.customer.dto.command.CustomerCreateReservationCommand;
import com.sures.application.customer.dto.command.CustomerUpdateReservationCommand;
import com.sures.application.customer.dto.command.CustomerVerifyReservationCommand;
import com.sures.application.customer.dto.result.CustomerReservationResult;
import com.sures.domain.reservation.Reservation;
import com.sures.domain.reservation.ReservationDomainService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

/**
 * 고객 예약 Service
 * - 트랜잭션 관리
 * - Command → Domain 변환
 * - Domain → Result 변환
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CustomerReservationService {

    private final ReservationDomainService reservationDomainService;

    /**
     * 예약 신청
     */
    @Transactional
    public CustomerReservationResult createReservation(CustomerCreateReservationCommand command) {
        Reservation saved = reservationDomainService.createAndSave(
                command.customerName(),
                command.phone(),
                command.email(),
                command.reservationDate(),
                command.reservationTime(),
                command.consultationType(),
                command.memo(),
                null  // 고객 예약은 adminId 없음
        );

        return CustomerReservationResult.from(saved);
    }

    /**
     * 예약 조회 (본인 인증)
     */
    public CustomerReservationResult verifyAndGetReservation(CustomerVerifyReservationCommand command) {
        Reservation reservation = reservationDomainService.findByCustomerVerification(
                command.customerName(),
                command.phone(),
                command.reservationNumber()
        );
        return CustomerReservationResult.from(reservation);
    }

    /**
     * 예약 단건 조회
     */
    public CustomerReservationResult getReservation(Long id) {
        Reservation reservation = reservationDomainService.getById(id);
        return CustomerReservationResult.from(reservation);
    }

    /**
     * 예약번호로 조회
     */
    public CustomerReservationResult getReservationByNumber(String reservationNumber) {
        Reservation reservation = reservationDomainService.getByReservationNumber(reservationNumber);
        return CustomerReservationResult.from(reservation);
    }

    /**
     * 예약 내용 수정 (메모, 상담유형, 이메일만 변경 가능)
     */
    @Transactional
    public CustomerReservationResult updateReservation(Long id, CustomerUpdateReservationCommand command) {
        Reservation reservation = reservationDomainService.getById(id);

        // 취소된 예약은 수정 불가
        if (reservation.getStatus().name().equals("CANCELLED")) {
            throw new IllegalArgumentException("취소된 예약은 수정할 수 없습니다.");
        }

        // 이메일 수정
        if (command.email() != null) {
            reservation.update(
                    reservation.getCustomerName(),
                    reservation.getPhone(),
                    command.email(),
                    reservation.getReservationDate(),
                    reservation.getReservationTime(),
                    reservation.getConsultationType(),
                    reservation.getMemo()
            );
        }

        // 상담유형 수정
        if (command.consultationType() != null) {
            reservation.updateConsultationType(command.consultationType());
        }

        // 메모 수정
        if (command.memo() != null) {
            reservation.updateMemo(command.memo());
        }

        return CustomerReservationResult.from(reservation);
    }

    /**
     * 예약 취소
     */
    @Transactional
    public void cancelReservation(Long id) {
        Reservation reservation = reservationDomainService.getById(id);

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
        return reservationDomainService.findReservedTimesByDate(date);
    }
}
