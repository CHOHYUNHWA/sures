package com.sures.infrastructure.persistence.jpa;

import com.sures.domain.reservation.Reservation;
import com.sures.domain.reservation.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

/**
 * Reservation JPA Repository (Spring Data JPA)
 */
public interface ReservationJpaRepository extends JpaRepository<Reservation, Long> {

    Optional<Reservation> findByReservationNumber(String reservationNumber);

    @Query("SELECT r FROM Reservation r WHERE r.customerName = :name AND r.phone = :phone AND r.reservationNumber = :reservationNumber")
    Optional<Reservation> findByCustomerVerification(
            @Param("name") String customerName,
            @Param("phone") String phone,
            @Param("reservationNumber") String reservationNumber
    );

    List<Reservation> findByReservationDateBetween(LocalDate startDate, LocalDate endDate);

    List<Reservation> findByStatus(ReservationStatus status);

    @Query("SELECT r FROM Reservation r WHERE r.customerName = :name AND r.phone = :phone AND r.status = 'CONFIRMED'")
    List<Reservation> findActiveByCustomer(@Param("name") String customerName, @Param("phone") String phone);

    boolean existsByReservationDateAndReservationTime(LocalDate date, LocalTime time);

    long countByReservationDate(LocalDate date);

    @Query("SELECT r.reservationTime FROM Reservation r WHERE r.reservationDate = :date AND r.status = 'CONFIRMED'")
    List<LocalTime> findReservedTimesByDate(@Param("date") LocalDate date);

    @Query("SELECT r.reservationTime FROM Reservation r WHERE r.reservationDate = :date AND r.status = 'CONFIRMED' AND r.id != :excludeId")
    List<LocalTime> findReservedTimesByDateExcluding(@Param("date") LocalDate date, @Param("excludeId") Long excludeId);

    @Query("SELECT r.reservationNumber FROM Reservation r ORDER BY r.id DESC LIMIT 1")
    Optional<String> findLastReservationNumber();
}
