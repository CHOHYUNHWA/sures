package com.sures.domain.reservation;

import com.sures.domain.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "reservation")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Reservation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reservation_number", nullable = false, unique = true, length = 20)
    private String reservationNumber;

    @Column(name = "customer_name", nullable = false, length = 50)
    private String customerName;

    @Column(name = "phone", nullable = false, length = 20)
    private String phone;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "reservation_date", nullable = false)
    private LocalDate reservationDate;

    @Column(name = "reservation_time", nullable = false)
    private LocalTime reservationTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "consultation_type", nullable = false, length = 20)
    private ConsultationType consultationType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private ReservationStatus status;

    @Column(name = "memo", columnDefinition = "TEXT")
    private String memo;

    @Column(name = "admin_id")
    private Long adminId;

    @Builder
    public Reservation(String reservationNumber, String customerName, String phone, String email,
                       LocalDate reservationDate, LocalTime reservationTime,
                       ConsultationType consultationType, ReservationStatus status, String memo, Long adminId) {
        this.reservationNumber = reservationNumber;
        this.customerName = customerName;
        this.phone = phone;
        this.email = email;
        this.reservationDate = reservationDate;
        this.reservationTime = reservationTime;
        this.consultationType = consultationType;
        this.status = status != null ? status : ReservationStatus.CONFIRMED;
        this.memo = memo;
        this.adminId = adminId;
    }

    public void confirm() {
        this.status = ReservationStatus.CONFIRMED;
    }

    public void complete() {
        this.status = ReservationStatus.COMPLETED;
    }

    public void cancel() {
        this.status = ReservationStatus.CANCELLED;
    }

    public void markNoShow() {
        this.status = ReservationStatus.NO_SHOW;
    }

    public void updateMemo(String memo) {
        this.memo = memo;
    }

    public void updateConsultationType(ConsultationType consultationType) {
        this.consultationType = consultationType;
    }

    public void assignAdmin(Long adminId) {
        this.adminId = adminId;
    }

    public void update(String customerName, String phone, String email,
                       LocalDate reservationDate, LocalTime reservationTime,
                       ConsultationType consultationType, String memo) {
        this.customerName = customerName;
        this.phone = phone;
        this.email = email;
        this.reservationDate = reservationDate;
        this.reservationTime = reservationTime;
        this.consultationType = consultationType;
        this.memo = memo;
    }
}
