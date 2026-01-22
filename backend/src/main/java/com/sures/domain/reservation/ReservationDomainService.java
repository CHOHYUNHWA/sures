package com.sures.domain.reservation;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * 예약 도메인 서비스 (순수 비즈니스 로직 - Spring 의존성 없음)
 */
public class ReservationDomainService {

    private final ReservationRepository reservationRepository;

    public ReservationDomainService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    /**
     * 중복 예약 검증
     */
    public void validateNoConflict(LocalDate date, LocalTime time) {
        if (reservationRepository.existsByReservationDateAndReservationTime(date, time)) {
            throw new IllegalArgumentException("해당 시간에 이미 예약이 있습니다.");
        }
    }

    /**
     * 중복 예약 검증 (특정 예약 제외 - 수정 시 사용)
     */
    public void validateNoConflictExcluding(LocalDate date, LocalTime time, Reservation current) {
        if (!current.getReservationDate().equals(date) || !current.getReservationTime().equals(time)) {
            validateNoConflict(date, time);
        }
    }

    /**
     * 1인 1예약 검증
     */
    public void validateSingleActiveReservation(String customerName, String phone) {
        if (!reservationRepository.findActiveByCustomer(customerName, phone).isEmpty()) {
            throw new IllegalArgumentException("이미 활성 예약이 있습니다. 기존 예약을 취소 후 새로 예약해주세요.");
        }
    }

    /**
     * 예약번호 생성 (R + 6자리 순번)
     */
    public String generateReservationNumber() {
        return reservationRepository.findLastReservationNumber()
                .map(lastNumber -> {
                    String numPart = lastNumber.substring(1);
                    int nextNum = Integer.parseInt(numPart) + 1;
                    return String.format("R%06d", nextNum);
                })
                .orElse("R000001");
    }

    /**
     * 취소 가능 여부 확인
     * - 오전 예약 (09:00~11:00): 전날까지 취소 가능
     * - 오후 예약 (13:00~17:00): 당일 12시까지 취소 가능
     */
    public boolean canCancel(Reservation reservation) {
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
     * 고객 취소 가능 여부 검증 (불가능하면 예외)
     */
    public void validateCanCancel(Reservation reservation) {
        if (!canCancel(reservation)) {
            throw new IllegalArgumentException("취소 마감 시간이 지났습니다. 전화로 문의해주세요.");
        }
    }

    /**
     * 예약 생성
     */
    public Reservation createReservation(
            String customerName,
            String phone,
            String email,
            LocalDate reservationDate,
            LocalTime reservationTime,
            ConsultationType consultationType,
            String memo,
            Long adminId
    ) {
        validateNoConflict(reservationDate, reservationTime);
        validateSingleActiveReservation(customerName, phone);

        String reservationNumber = generateReservationNumber();

        return Reservation.builder()
                .reservationNumber(reservationNumber)
                .customerName(customerName)
                .phone(phone)
                .email(email)
                .reservationDate(reservationDate)
                .reservationTime(reservationTime)
                .consultationType(consultationType)
                .memo(memo)
                .adminId(adminId)
                .build();
    }

    /**
     * 예약 조회 (ID)
     */
    public Reservation getById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다: " + id));
    }

    /**
     * 예약 조회 (예약번호)
     */
    public Reservation getByReservationNumber(String reservationNumber) {
        return reservationRepository.findByReservationNumber(reservationNumber)
                .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다."));
    }
}
