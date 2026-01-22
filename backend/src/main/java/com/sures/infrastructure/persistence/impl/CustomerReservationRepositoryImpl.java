package com.sures.infrastructure.persistence.impl;

import com.sures.domain.reservation.CustomerReservationRepository;
import com.sures.domain.reservation.Reservation;
import com.sures.infrastructure.persistence.jpa.CustomerReservationJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

/**
 * CustomerReservationRepository 구현체 (Domain Repository → JPA Repository)
 */
@Repository
@RequiredArgsConstructor
public class CustomerReservationRepositoryImpl implements CustomerReservationRepository {

    private final CustomerReservationJpaRepository jpaRepository;

    @Override
    public Optional<Reservation> findById(Long id) {
        return jpaRepository.findById(id);
    }

    @Override
    public Reservation save(Reservation reservation) {
        return jpaRepository.save(reservation);
    }

    @Override
    public Optional<Reservation> findByReservationNumber(String reservationNumber) {
        return jpaRepository.findByReservationNumber(reservationNumber);
    }

    @Override
    public Optional<Reservation> findByCustomerVerification(
            String customerName,
            String phone,
            String reservationNumber
    ) {
        return jpaRepository.findByCustomerVerification(customerName, phone, reservationNumber);
    }

    @Override
    public List<Reservation> findActiveByCustomer(String customerName, String phone) {
        return jpaRepository.findActiveByCustomer(customerName, phone);
    }

    @Override
    public boolean existsByReservationDateAndReservationTime(LocalDate date, LocalTime time) {
        return jpaRepository.existsByReservationDateAndReservationTime(date, time);
    }

    @Override
    public List<LocalTime> findReservedTimesByDate(LocalDate date) {
        return jpaRepository.findReservedTimesByDate(date);
    }

    @Override
    public Optional<String> findLastReservationNumber() {
        return jpaRepository.findLastReservationNumber();
    }
}
