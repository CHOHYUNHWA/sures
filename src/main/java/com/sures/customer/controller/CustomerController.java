package com.sures.customer.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/customer")
public class CustomerController {

    /**
     * 고객 메인 페이지 (랜딩)
     */
    @GetMapping
    public String home() {
        return "customer/home";
    }

    /**
     * 예약 신청 폼
     */
    @GetMapping("/reservations/apply")
    public String applyForm() {
        return "customer/reservation/apply";
    }

    /**
     * 예약 신청 처리
     */
    @PostMapping("/reservations")
    public String createReservation() {
        // TODO: 예약 생성 로직
        return "redirect:/customer/reservations/verify";
    }

    /**
     * 예약 조회 폼 (개인정보 확인)
     */
    @GetMapping("/reservations/verify")
    public String verifyForm() {
        return "customer/reservation/verify";
    }

    /**
     * 예약 조회 처리
     */
    @PostMapping("/reservations/verify")
    public String verifyReservation(Model model) {
        // TODO: 이름+전화+예약번호로 조회 로직
        return "customer/reservation/list";
    }

    /**
     * 예약 상세 조회
     */
    @GetMapping("/reservations/{id}")
    public String reservationDetail(@PathVariable Long id, Model model) {
        // TODO: 예약 상세 조회 로직
        model.addAttribute("reservationId", id);
        return "customer/reservation/detail";
    }

    /**
     * 예약 취소
     */
    @DeleteMapping("/reservations/{id}")
    public String cancelReservation(@PathVariable Long id) {
        // TODO: 예약 취소 로직
        return "redirect:/customer";
    }
}
