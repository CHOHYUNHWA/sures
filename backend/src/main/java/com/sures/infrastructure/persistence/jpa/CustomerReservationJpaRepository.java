package com.sures.infrastructure.persistence.jpa;

import com.sures.domain.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

/**
 * Customer Reservation JPA Repository (Spring Data JPA)
 */
public interface CustomerReservationJpaRepository extends JpaRepository<Reservation, Long> {

    Optional<Reservation> findByReservationNumber(String reservationNumber);

    @Query("SELECT r FROM Reservation r WHERE r.customerName = :name AND r.phone = :phone AND r.reservationNumber = :reservationNumber")
    Optional<Reservation> findByCustomerVerification(
            @Param("name") String customerName,
            @Param("phone") String phone,
            @Param("reservationNumber") String reservationNumber
    );

    @Query("SELECT r FROM Reservation r WHERE r.customerName = :name AND r.phone = :phone AND r.status = 'CONFIRMED'")
    List<Reservation> findActiveByCustomer(@Param("name") String customerName, @Param("phone") String phone);

    boolean existsByReservationDateAndReservationTime(LocalDate date, LocalTime time);

    @Query("SELECT r.reservationTime FROM Reservation r WHERE r.reservationDate = :date AND r.status = 'CONFIRMED'")
    List<LocalTime> findReservedTimesByDate(@Param("date") LocalDate date);

    @Query("SELECT r.reservationNumber FROM Reservation r ORDER BY r.id DESC LIMIT 1")
    Optional<String> findLastReservationNumber();
}
