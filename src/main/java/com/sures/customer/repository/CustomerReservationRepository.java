package com.sures.customer.repository;

import com.sures.domain.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface CustomerReservationRepository extends JpaRepository<Reservation, Long> {

    /**
     * 예약번호로 예약 조회
     */
    Optional<Reservation> findByReservationNumber(String reservationNumber);

    /**
     * 고객명 + 전화번호 + 예약번호로 예약 조회 (본인 인증용)
     */
    @Query("SELECT r FROM Reservation r WHERE r.customerName = :name AND r.phone = :phone AND r.reservationNumber = :reservationNumber")
    Optional<Reservation> findByCustomerVerification(
            @Param("name") String customerName,
            @Param("phone") String phone,
            @Param("reservationNumber") String reservationNumber
    );

    /**
     * 고객명 + 전화번호로 활성 예약 조회 (1인 1예약 체크용)
     */
    @Query("SELECT r FROM Reservation r WHERE r.customerName = :name AND r.phone = :phone AND r.status = 'CONFIRMED'")
    List<Reservation> findActiveByCustomer(@Param("name") String customerName, @Param("phone") String phone);

    /**
     * 특정 날짜+시간에 예약 존재 여부 (중복 예약 방지)
     */
    boolean existsByReservationDateAndReservationTime(LocalDate date, LocalTime time);

    /**
     * 특정 날짜의 예약된 시간 목록 조회
     */
    @Query("SELECT r.reservationTime FROM Reservation r WHERE r.reservationDate = :date AND r.status = 'CONFIRMED'")
    List<LocalTime> findReservedTimesByDate(@Param("date") LocalDate date);

    /**
     * 마지막 예약번호 조회 (순번 생성용)
     */
    @Query("SELECT r.reservationNumber FROM Reservation r ORDER BY r.id DESC LIMIT 1")
    Optional<String> findLastReservationNumber();
}
