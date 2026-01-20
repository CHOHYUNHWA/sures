package com.sures.customer.service;

import com.sures.customer.dto.*;
import com.sures.customer.repository.CustomerReservationRepository;
import com.sures.domain.entity.Reservation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CustomerReservationService {

    private final CustomerReservationRepository reservationRepository;

    /**
     * 예약 신청
     */
    @Transactional
    public Long createReservation(CustomerReservationCreateRequest request) {
        // 중복 예약 체크
        if (reservationRepository.existsByReservationDateAndReservationTime(
                request.reservationDate(), request.reservationTime())) {
            throw new IllegalArgumentException("해당 시간에 이미 예약이 있습니다.");
        }

        // 1인 1예약 체크
        if (!reservationRepository.findActiveByCustomer(request.customerName(), request.phone()).isEmpty()) {
            throw new IllegalArgumentException("이미 활성 예약이 있습니다. 기존 예약을 취소 후 새로 예약해주세요.");
        }

        // 예약번호 생성
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
                .adminId(null)
                .build();

        Reservation saved = reservationRepository.save(reservation);
        return saved.getId();
    }

    /**
     * 예약 조회 (본인 인증)
     */
    public CustomerReservationResponse verifyAndGetReservation(CustomerReservationVerifyRequest request) {
        Reservation reservation = reservationRepository.findByCustomerVerification(
                        request.customerName(), request.phone(), request.reservationNumber())
                .orElseThrow(() -> new IllegalArgumentException("예약 정보를 찾을 수 없습니다. 입력 정보를 확인해주세요."));
        return CustomerReservationResponse.from(reservation);
    }

    /**
     * 예약 단건 조회
     */
    public CustomerReservationResponse getReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다."));
        return CustomerReservationResponse.from(reservation);
    }

    /**
     * 예약번호로 조회
     */
    public CustomerReservationResponse getReservationByNumber(String reservationNumber) {
        Reservation reservation = reservationRepository.findByReservationNumber(reservationNumber)
                .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다."));
        return CustomerReservationResponse.from(reservation);
    }

    /**
     * 예약 내용 수정 (메모, 상담유형, 이메일만 변경 가능)
     */
    @Transactional
    public void updateReservation(Long id, CustomerReservationUpdateRequest request) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다."));

        // 취소된 예약은 수정 불가
        if (reservation.getStatus().name().equals("CANCELLED")) {
            throw new IllegalArgumentException("취소된 예약은 수정할 수 없습니다.");
        }

        // 이메일 수정
        if (request.email() != null) {
            reservation.update(
                    reservation.getCustomerName(),
                    reservation.getPhone(),
                    request.email(),
                    reservation.getReservationDate(),
                    reservation.getReservationTime(),
                    reservation.getConsultationType(),
                    reservation.getMemo()
            );
        }

        // 상담유형 수정
        if (request.consultationType() != null) {
            reservation.updateConsultationType(request.consultationType());
        }

        // 메모 수정
        if (request.memo() != null) {
            reservation.updateMemo(request.memo());
        }
    }

    /**
     * 예약 취소
     */
    @Transactional
    public void cancelReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다."));

        // 이미 취소된 예약
        if (reservation.getStatus().name().equals("CANCELLED")) {
            throw new IllegalArgumentException("이미 취소된 예약입니다.");
        }

        // 완료된 예약은 취소 불가
        if (reservation.getStatus().name().equals("COMPLETED")) {
            throw new IllegalArgumentException("완료된 예약은 취소할 수 없습니다.");
        }

        // 취소 마감 시간 체크
        if (!canCancel(reservation)) {
            throw new IllegalArgumentException("취소 마감 시간이 지났습니다. 전화로 문의해주세요.");
        }

        reservation.cancel();
    }

    /**
     * 취소 가능 여부 확인
     * - 오전 예약: 전날 자정까지
     * - 오후 예약: 당일 오전 12시까지
     */
    private boolean canCancel(Reservation reservation) {
        LocalDate today = LocalDate.now();
        LocalDate reservationDate = reservation.getReservationDate();
        LocalTime reservationTime = reservation.getReservationTime();
        LocalTime now = LocalTime.now();

        // 이미 지난 예약
        if (reservationDate.isBefore(today)) {
            return false;
        }

        // 오전 예약 (09:00 ~ 11:00): 전날까지 취소 가능
        if (reservationTime.getHour() < 12) {
            return today.isBefore(reservationDate);
        }

        // 오후 예약 (13:00 ~ 17:00): 당일 12시까지 취소 가능
        if (reservationDate.equals(today)) {
            return now.isBefore(LocalTime.of(12, 0));
        }

        return true;
    }

    /**
     * 특정 날짜의 예약된 시간 목록 조회
     */
    public List<LocalTime> getReservedTimes(LocalDate date) {
        return reservationRepository.findReservedTimesByDate(date);
    }

    /**
     * 예약번호 생성 (R + 6자리 순번)
     */
    private String generateReservationNumber() {
        return reservationRepository.findLastReservationNumber()
                .map(lastNumber -> {
                    String numPart = lastNumber.substring(1);
                    int nextNum = Integer.parseInt(numPart) + 1;
                    return String.format("R%06d", nextNum);
                })
                .orElse("R000001");
    }
}
