package com.sures.customer.controller;

import com.sures.customer.dto.*;
import com.sures.customer.service.CustomerReservationService;
import com.sures.domain.entity.ConsultationType;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDate;
import java.util.List;

@Controller
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerReservationController {

    private final CustomerReservationService reservationService;

    /**
     * 고객 메인 페이지
     */
    @GetMapping
    public String home() {
        return "customer/home";
    }

    /**
     * 예약 신청 폼
     */
    @GetMapping("/reservations/apply")
    public String applyForm(Model model) {
        model.addAttribute("consultationTypes", ConsultationType.values());
        model.addAttribute("today", LocalDate.now());
        return "customer/reservation/apply";
    }

    /**
     * 예약 신청 처리
     */
    @PostMapping("/reservations")
    public String createReservation(
            @Valid @ModelAttribute CustomerReservationCreateRequest request,
            BindingResult bindingResult,
            RedirectAttributes redirectAttributes
    ) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldErrors().stream()
                    .findFirst()
                    .map(error -> error.getDefaultMessage())
                    .orElse("입력값을 확인해주세요.");
            redirectAttributes.addFlashAttribute("error", errorMessage);
            return "redirect:/customer/reservations/apply";
        }

        try {
            Long id = reservationService.createReservation(request);
            CustomerReservationResponse reservation = reservationService.getReservation(id);
            redirectAttributes.addFlashAttribute("success", "예약이 완료되었습니다. 예약번호: " + reservation.reservationNumber());
            redirectAttributes.addFlashAttribute("reservationNumber", reservation.reservationNumber());
            return "redirect:/customer/reservations/complete";
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
            return "redirect:/customer/reservations/apply";
        }
    }

    /**
     * 예약 완료 페이지
     */
    @GetMapping("/reservations/complete")
    public String completePage(@ModelAttribute("reservationNumber") String reservationNumber, Model model) {
        if (reservationNumber == null || reservationNumber.isEmpty()) {
            return "redirect:/customer";
        }
        model.addAttribute("reservationNumber", reservationNumber);
        return "customer/reservation/complete";
    }

    /**
     * 예약 조회 폼 (본인 인증)
     */
    @GetMapping("/reservations/verify")
    public String verifyForm() {
        return "customer/reservation/verify";
    }

    /**
     * 예약 조회 처리 (본인 인증)
     */
    @PostMapping("/reservations/verify")
    public String verifyReservation(
            @Valid @ModelAttribute CustomerReservationVerifyRequest request,
            BindingResult bindingResult,
            HttpSession session,
            RedirectAttributes redirectAttributes
    ) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldErrors().stream()
                    .findFirst()
                    .map(error -> error.getDefaultMessage())
                    .orElse("입력값을 확인해주세요.");
            redirectAttributes.addFlashAttribute("error", errorMessage);
            return "redirect:/customer/reservations/verify";
        }

        try {
            CustomerReservationResponse reservation = reservationService.verifyAndGetReservation(request);
            // 세션에 인증 정보 저장
            session.setAttribute("verifiedReservationId", reservation.id());
            session.setAttribute("verifiedCustomerName", request.customerName());
            session.setAttribute("verifiedPhone", request.phone());
            return "redirect:/customer/reservations/" + reservation.id();
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
            return "redirect:/customer/reservations/verify";
        }
    }

    /**
     * 예약 상세 조회
     */
    @GetMapping("/reservations/{id}")
    public String detail(@PathVariable Long id, HttpSession session, Model model) {
        // 인증 확인
        Long verifiedId = (Long) session.getAttribute("verifiedReservationId");
        if (verifiedId == null || !verifiedId.equals(id)) {
            return "redirect:/customer/reservations/verify";
        }

        CustomerReservationResponse reservation = reservationService.getReservation(id);
        model.addAttribute("reservation", reservation);
        return "customer/reservation/detail";
    }

    /**
     * 예약 수정 폼
     */
    @GetMapping("/reservations/{id}/edit")
    public String editForm(@PathVariable Long id, HttpSession session, Model model) {
        // 인증 확인
        Long verifiedId = (Long) session.getAttribute("verifiedReservationId");
        if (verifiedId == null || !verifiedId.equals(id)) {
            return "redirect:/customer/reservations/verify";
        }

        CustomerReservationResponse reservation = reservationService.getReservation(id);

        // 취소된 예약은 수정 불가
        if (reservation.status().name().equals("CANCELLED")) {
            return "redirect:/customer/reservations/" + id;
        }

        model.addAttribute("reservation", reservation);
        model.addAttribute("consultationTypes", ConsultationType.values());
        return "customer/reservation/edit";
    }

    /**
     * 예약 수정 처리
     */
    @PostMapping("/reservations/{id}")
    public String update(
            @PathVariable Long id,
            @Valid @ModelAttribute CustomerReservationUpdateRequest request,
            BindingResult bindingResult,
            HttpSession session,
            RedirectAttributes redirectAttributes
    ) {
        // 인증 확인
        Long verifiedId = (Long) session.getAttribute("verifiedReservationId");
        if (verifiedId == null || !verifiedId.equals(id)) {
            return "redirect:/customer/reservations/verify";
        }

        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldErrors().stream()
                    .findFirst()
                    .map(error -> error.getDefaultMessage())
                    .orElse("입력값을 확인해주세요.");
            redirectAttributes.addFlashAttribute("error", errorMessage);
            return "redirect:/customer/reservations/" + id + "/edit";
        }

        try {
            reservationService.updateReservation(id, request);
            redirectAttributes.addFlashAttribute("success", "예약 정보가 수정되었습니다.");
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
        }
        return "redirect:/customer/reservations/" + id;
    }

    /**
     * 예약 취소
     */
    @PostMapping("/reservations/{id}/cancel")
    public String cancel(@PathVariable Long id, HttpSession session, RedirectAttributes redirectAttributes) {
        // 인증 확인
        Long verifiedId = (Long) session.getAttribute("verifiedReservationId");
        if (verifiedId == null || !verifiedId.equals(id)) {
            return "redirect:/customer/reservations/verify";
        }

        try {
            reservationService.cancelReservation(id);
            redirectAttributes.addFlashAttribute("success", "예약이 취소되었습니다.");
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
        }
        return "redirect:/customer/reservations/" + id;
    }

    /**
     * 특정 날짜의 예약된 시간 목록 조회 (AJAX)
     */
    @GetMapping("/reservations/reserved-times")
    @ResponseBody
    public List<String> getReservedTimes(@RequestParam LocalDate date) {
        return reservationService.getReservedTimes(date)
                .stream()
                .map(time -> time.toString().substring(0, 5))
                .toList();
    }
}
