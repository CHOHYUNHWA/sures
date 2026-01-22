package com.sures.domain.repository;

import com.sures.domain.entity.Reservation;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

/**
 * 고객 예약 Repository 인터페이스 (순수 도메인 - Spring 의존성 없음)
 * 고객 기능에서 사용
 */
public interface CustomerReservationRepository {

    Optional<Reservation> findById(Long id);

    Reservation save(Reservation reservation);

    /**
     * 예약번호로 예약 조회
     */
    Optional<Reservation> findByReservationNumber(String reservationNumber);

    /**
     * 고객명 + 전화번호 + 예약번호로 예약 조회 (본인 인증용)
     */
    Optional<Reservation> findByCustomerVerification(
            String customerName,
            String phone,
            String reservationNumber
    );

    /**
     * 고객명 + 전화번호로 활성 예약 조회 (1인 1예약 체크용)
     */
    List<Reservation> findActiveByCustomer(String customerName, String phone);

    /**
     * 특정 날짜+시간에 예약 존재 여부 (중복 예약 방지)
     */
    boolean existsByReservationDateAndReservationTime(LocalDate date, LocalTime time);

    /**
     * 특정 날짜의 예약된 시간 목록 조회
     */
    List<LocalTime> findReservedTimesByDate(LocalDate date);

    /**
     * 마지막 예약번호 조회 (순번 생성용)
     */
    Optional<String> findLastReservationNumber();
}
