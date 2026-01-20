package com.sures.admin.service;

import com.sures.admin.dto.*;
import com.sures.admin.repository.ReservationRepository;
import com.sures.domain.entity.Reservation;
import com.sures.domain.entity.ReservationStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReservationService {

    private final ReservationRepository reservationRepository;

    /**
     * 예약 목록 검색 (페이징)
     */
    public Page<ReservationResponse> searchReservations(ReservationSearchRequest request) {
        Pageable pageable = PageRequest.of(request.page(), request.size());

        Page<Reservation> reservations = reservationRepository.searchReservations(
                request.status(),
                request.startDate(),
                request.endDate(),
                request.keyword(),
                pageable
        );

        return reservations.map(ReservationResponse::from);
    }

    /**
     * 예약 단건 조회
     */
    public ReservationResponse getReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다: " + id));
        return ReservationResponse.from(reservation);
    }

    /**
     * 예약 생성
     */
    @Transactional
    public Long createReservation(ReservationCreateRequest request, Long adminId) {
        // 중복 예약 체크
        if (reservationRepository.existsByReservationDateAndReservationTime(
                request.reservationDate(), request.reservationTime())) {
            throw new IllegalArgumentException("해당 시간에 이미 예약이 있습니다.");
        }

        // 1인 1예약 체크
        if (!reservationRepository.findActiveByCustomer(request.customerName(), request.phone()).isEmpty()) {
            throw new IllegalArgumentException("해당 고객은 이미 활성 예약이 있습니다.");
        }

        // 예약번호 생성 (R + 6자리 순번)
        String reservationNumber = generateReservationNumber();

        Reservation reservation = Reservation.builder()
                .reservationNumber(reservationNumber)
                .customerName(request.customerName())
                .phone(request.phone())
                .email(request.email())
                .reservationDate(request.reservationDate())
                .reservationTime(request.reservationTime())
                .consultationType(request.consultationType())
                .memo(request.memo())
                .adminId(adminId)
                .build();

        Reservation saved = reservationRepository.save(reservation);
        return saved.getId();
    }

    /**
     * 예약 수정 (예약번호 제외 모든 필드)
     */
    @Transactional
    public void updateReservation(Long id, ReservationUpdateRequest request) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다: " + id));

        // 날짜/시간이 변경된 경우 중복 체크
        boolean dateTimeChanged = !reservation.getReservationDate().equals(request.reservationDate())
                || !reservation.getReservationTime().equals(request.reservationTime());

        if (dateTimeChanged) {
            if (reservationRepository.existsByReservationDateAndReservationTime(
                    request.reservationDate(), request.reservationTime())) {
                throw new IllegalArgumentException("해당 시간에 이미 예약이 있습니다.");
            }
        }

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
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다: " + id));
        reservation.cancel();
    }

    /**
     * 예약 확정
     */
    @Transactional
    public void confirmReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다: " + id));
        reservation.confirm();
    }

    /**
     * 상담 완료 처리
     */
    @Transactional
    public void completeReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다: " + id));
        reservation.complete();
    }

    /**
     * 노쇼 처리
     */
    @Transactional
    public void markNoShow(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다: " + id));
        reservation.markNoShow();
    }

    /**
     * 예약번호 생성 (R + 6자리 순번, 전체 고유)
     */
    private String generateReservationNumber() {
        return reservationRepository.findLastReservationNumber()
                .map(lastNumber -> {
                    // R000001 형식에서 숫자 부분 추출
                    String numPart = lastNumber.substring(1);
                    int nextNum = Integer.parseInt(numPart) + 1;
                    return String.format("R%06d", nextNum);
                })
                .orElse("R000001"); // 첫 번째 예약
    }

    private void updateStatus(Reservation reservation, ReservationStatus status) {
        switch (status) {
            case CONFIRMED -> reservation.confirm();
            case COMPLETED -> reservation.complete();
            case CANCELLED -> reservation.cancel();
            case NO_SHOW -> reservation.markNoShow();
        }
    }

    /**
     * 특정 날짜의 예약된 시간 목록 조회
     */
    public java.util.List<java.time.LocalTime> getReservedTimes(LocalDate date) {
        return reservationRepository.findReservedTimesByDate(date);
    }

    /**
     * 특정 날짜의 예약된 시간 목록 조회 (특정 예약 제외)
     */
    public java.util.List<java.time.LocalTime> getReservedTimesExcluding(LocalDate date, Long excludeId) {
        return reservationRepository.findReservedTimesByDateExcluding(date, excludeId);
    }
}