package com.sures.infrastructure.persistence.impl;

import com.sures.domain.entity.Reservation;
import com.sures.domain.entity.ReservationStatus;
import com.sures.domain.repository.ReservationRepository;
import com.sures.domain.vo.PageRequest;
import com.sures.domain.vo.PageResult;
import com.sures.infrastructure.persistence.jpa.ReservationJpaRepository;
import com.sures.infrastructure.persistence.querydsl.ReservationQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

/**
 * ReservationRepository 구현체 (Domain Repository → JPA Repository + QueryDSL)
 */
@Repository
@RequiredArgsConstructor
public class ReservationRepositoryImpl implements ReservationRepository {

    private final ReservationJpaRepository jpaRepository;
    private final ReservationQueryRepository queryRepository;

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
    public List<Reservation> findByReservationDateBetween(LocalDate startDate, LocalDate endDate) {
        return jpaRepository.findByReservationDateBetween(startDate, endDate);
    }

    @Override
    public List<Reservation> findByStatus(ReservationStatus status) {
        return jpaRepository.findByStatus(status);
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
    public PageResult<Reservation> searchReservations(
            ReservationStatus status,
            LocalDate startDate,
            LocalDate endDate,
            String keyword,
            PageRequest pageRequest
    ) {
        Pageable pageable = org.springframework.data.domain.PageRequest.of(
                pageRequest.page(),
                pageRequest.size()
        );

        Page<Reservation> page = queryRepository.searchReservations(
                status,
                startDate,
                endDate,
                keyword,
                pageable
        );

        return PageResult.of(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements()
        );
    }

    @Override
    public long countByReservationDate(LocalDate date) {
        return jpaRepository.countByReservationDate(date);
    }

    @Override
    public List<LocalTime> findReservedTimesByDate(LocalDate date) {
        return jpaRepository.findReservedTimesByDate(date);
    }

    @Override
    public List<LocalTime> findReservedTimesByDateExcluding(LocalDate date, Long excludeId) {
        return jpaRepository.findReservedTimesByDateExcluding(date, excludeId);
    }

    @Override
    public Optional<String> findLastReservationNumber() {
        return jpaRepository.findLastReservationNumber();
    }
}
