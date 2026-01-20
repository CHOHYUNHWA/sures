package com.sures.admin.repository;

import com.sures.domain.entity.Reservation;
import com.sures.domain.entity.ReservationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Optional<Reservation> findByReservationNumber(String reservationNumber);

    // 날짜 범위로 조회
    List<Reservation> findByReservationDateBetween(LocalDate startDate, LocalDate endDate);

    // 상태별 조회
    List<Reservation> findByStatus(ReservationStatus status);

    // 고객명 + 전화번호로 활성 예약 조회 (1인 1예약 체크용)
    @Query("SELECT r FROM Reservation r WHERE r.customerName = :name AND r.phone = :phone AND r.status = 'CONFIRMED'")
    List<Reservation> findActiveByCustomer(@Param("name") String customerName, @Param("phone") String phone);

    // 특정 날짜+시간에 예약 존재 여부 (중복 예약 방지)
    boolean existsByReservationDateAndReservationTime(LocalDate date, java.time.LocalTime time);

    // 검색 조건으로 페이징 조회
    @Query("SELECT r FROM Reservation r WHERE " +
           "(:status IS NULL OR r.status = :status) AND " +
           "(:startDate IS NULL OR r.reservationDate >= :startDate) AND " +
           "(:endDate IS NULL OR r.reservationDate <= :endDate) AND " +
           "(:keyword IS NULL OR r.customerName LIKE %:keyword% OR r.phone LIKE %:keyword% OR r.reservationNumber LIKE %:keyword%) " +
           "ORDER BY r.reservationDate DESC, r.reservationTime DESC")
    Page<Reservation> searchReservations(
            @Param("status") ReservationStatus status,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("keyword") String keyword,
            Pageable pageable
    );

    // 오늘 예약 건수
    long countByReservationDate(LocalDate date);

    // 특정 날짜의 예약된 시간 목록 조회
    @Query("SELECT r.reservationTime FROM Reservation r WHERE r.reservationDate = :date AND r.status = 'CONFIRMED'")
    List<java.time.LocalTime> findReservedTimesByDate(@Param("date") LocalDate date);

    // 특정 날짜의 예약된 시간 목록 조회 (특정 예약 제외)
    @Query("SELECT r.reservationTime FROM Reservation r WHERE r.reservationDate = :date AND r.status = 'CONFIRMED' AND r.id != :excludeId")
    List<java.time.LocalTime> findReservedTimesByDateExcluding(@Param("date") LocalDate date, @Param("excludeId") Long excludeId);

    // 마지막 예약번호 조회 (전체 순번용)
    @Query("SELECT r.reservationNumber FROM Reservation r ORDER BY r.id DESC LIMIT 1")
    Optional<String> findLastReservationNumber();
}