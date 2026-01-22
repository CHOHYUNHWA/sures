package com.sures.application.facade;

import com.sures.domain.entity.Reservation;
import com.sures.domain.repository.ReservationRepository;
import com.sures.domain.service.ReservationDomainService;
import com.sures.domain.vo.PageRequest;
import com.sures.domain.vo.PageResult;
import com.sures.presentation.admin.dto.ReservationCreateRequest;
import com.sures.presentation.admin.dto.ReservationResponse;
import com.sures.presentation.admin.dto.ReservationSearchRequest;
import com.sures.presentation.admin.dto.ReservationUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

/**
 * 예약 관리 Application Facade (관리자용)
 * - 트랜잭션 관리
 * - DTO ↔ Domain 변환
 * - Domain Service 조합
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReservationFacade {

    private final ReservationRepository reservationRepository;
    private final ReservationDomainService reservationDomainService;

    /**
     * 예약 목록 검색 (페이징)
     */
    public PageResult<ReservationResponse> searchReservations(ReservationSearchRequest request) {
        PageRequest pageRequest = PageRequest.of(request.page(), request.size());

        PageResult<Reservation> reservations = reservationRepository.searchReservations(
                request.status(),
                request.startDate(),
                request.endDate(),
                request.keyword(),
                pageRequest
        );

        return reservations.map(ReservationResponse::from);
    }

    /**
     * 예약 단건 조회
     */
    public ReservationResponse getReservation(Long id) {
        Reservation reservation = reservationDomainService.getById(id);
        return ReservationResponse.from(reservation);
    }

    /**
     * 예약 생성
     */
    @Transactional
    public Long createReservation(ReservationCreateRequest request, Long adminId) {
        Reservation reservation = reservationDomainService.createReservation(
                request.customerName(),
                request.phone(),
                request.email(),
                request.reservationDate(),
                request.reservationTime(),
                request.consultationType(),
                request.memo(),
                adminId
        );

        Reservation saved = reservationRepository.save(reservation);
        return saved.getId();
    }

    /**
     * 예약 수정
     */
    @Transactional
    public void updateReservation(Long id, ReservationUpdateRequest request) {
        Reservation reservation = reservationDomainService.getById(id);

        // 날짜/시간 변경 시 중복 체크
        reservationDomainService.validateNoConflictExcluding(
                request.reservationDate(),
                request.reservationTime(),
                reservation
        );

        reservation.update(
                request.customerName(),
                request.phone(),
                request.email(),
                request.reservationDate(),
                request.reservationTime(),
                request.consultationType(),
                request.memo()
        );
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
