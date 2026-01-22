package com.sures.application.admin.service;

import com.sures.application.admin.dto.command.CreateReservationCommand;
import com.sures.application.admin.dto.command.SearchReservationCommand;
import com.sures.application.admin.dto.command.UpdateReservationCommand;
import com.sures.application.admin.dto.result.ReservationResult;
import com.sures.domain.common.PageRequest;
import com.sures.domain.common.PageResult;
import com.sures.domain.reservation.Reservation;
import com.sures.domain.reservation.ReservationDomainService;
import com.sures.domain.reservation.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

/**
 * 예약 관리 Service (관리자용)
 * - 트랜잭션 관리
 * - Command → Domain 변환
 * - Domain → Result 변환
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final ReservationDomainService reservationDomainService;

    /**
     * 예약 목록 검색 (페이징)
     */
    public PageResult<ReservationResult> searchReservations(SearchReservationCommand command) {
        PageRequest pageRequest = PageRequest.of(command.page(), command.size());

        PageResult<Reservation> reservations = reservationRepository.searchReservations(
                command.status(),
                command.startDate(),
                command.endDate(),
                command.keyword(),
                pageRequest
        );

        return reservations.map(ReservationResult::from);
    }

    /**
     * 예약 단건 조회
     */
    public ReservationResult getReservation(Long id) {
        Reservation reservation = reservationDomainService.getById(id);
        return ReservationResult.from(reservation);
    }

    /**
     * 예약 생성
     */
    @Transactional
    public ReservationResult createReservation(CreateReservationCommand command, Long adminId) {
        Reservation reservation = reservationDomainService.createReservation(
                command.customerName(),
                command.phone(),
                command.email(),
                command.reservationDate(),
                command.reservationTime(),
                command.consultationType(),
                command.memo(),
                adminId
        );

        Reservation saved = reservationRepository.save(reservation);
        return ReservationResult.from(saved);
    }

    /**
     * 예약 수정
     */
    @Transactional
    public ReservationResult updateReservation(Long id, UpdateReservationCommand command) {
        Reservation reservation = reservationDomainService.getById(id);

        // 날짜/시간 변경 시 중복 체크
        reservationDomainService.validateNoConflictExcluding(
                command.reservationDate(),
                command.reservationTime(),
                reservation
        );

        reservation.update(
                command.customerName(),
                command.phone(),
                command.email(),
                command.reservationDate(),
                command.reservationTime(),
                command.consultationType(),
                command.memo()
        );

        return ReservationResult.from(reservation);
    }

    /**
     * 예약 취소
     */
    @Transactional
    public void cancelReservation(Long id) {
        Reservation reservation = reservationDomainService.getById(id);
        reservation.cancel();
    }

    /**
     * 예약 확정
     */
    @Transactional
    public void confirmReservation(Long id) {
        Reservation reservation = reservationDomainService.getById(id);
        reservation.confirm();
    }

    /**
     * 상담 완료 처리
     */
    @Transactional
    public void completeReservation(Long id) {
        Reservation reservation = reservationDomainService.getById(id);
        reservation.complete();
    }

    /**
     * 노쇼 처리
     */
    @Transactional
    public void markNoShow(Long id) {
        Reservation reservation = reservationDomainService.getById(id);
        reservation.markNoShow();
    }

    /**
     * 특정 날짜의 예약된 시간 목록 조회
     */
    public List<LocalTime> getReservedTimes(LocalDate date) {
        return reservationRepository.findReservedTimesByDate(date);
    }

    /**
     * 특정 날짜의 예약된 시간 목록 조회 (특정 예약 제외)
     */
    public List<LocalTime> getReservedTimesExcluding(LocalDate date, Long excludeId) {
        return reservationRepository.findReservedTimesByDateExcluding(date, excludeId);
    }
}
