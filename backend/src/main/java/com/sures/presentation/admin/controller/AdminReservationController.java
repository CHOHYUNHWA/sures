package com.sures.presentation.admin.controller;

import com.sures.presentation.admin.dto.*;
import com.sures.application.facade.ReservationFacade;
import com.sures.domain.entity.ConsultationType;
import com.sures.domain.entity.ReservationStatus;
import com.sures.domain.vo.PageResult;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDate;

@Controller
@RequestMapping("/admin/reservations")
@RequiredArgsConstructor
public class AdminReservationController {

    private final ReservationFacade reservationFacade;

    /**
     * 예약 목록 (검색, 필터 지원)
     */
    @GetMapping
    public String list(
            @RequestParam(required = false) ReservationStatus status,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            Model model
    ) {
        ReservationSearchRequest searchRequest = new ReservationSearchRequest(
                status, startDate, endDate, keyword, page, size
        );

        PageResult<ReservationResponse> reservations = reservationFacade.searchReservations(searchRequest);

        model.addAttribute("currentMenu", "reservations");
        model.addAttribute("reservations", reservations);
        model.addAttribute("statuses", ReservationStatus.values());
        model.addAttribute("searchStatus", status);
        model.addAttribute("searchStartDate", startDate);
        model.addAttribute("searchEndDate", endDate);
        model.addAttribute("searchKeyword", keyword);

        return "admin/reservation/list";
    }

    /**
     * 예약 등록 폼
     */
    @GetMapping("/new")
    public String createForm(Model model) {
        model.addAttribute("currentMenu", "new");
        model.addAttribute("consultationTypes", ConsultationType.values());
        model.addAttribute("today", LocalDate.now());
        return "admin/reservation/create";
    }

    /**
     * 예약 등록 처리
     */
    @PostMapping
    public String create(
            @Valid @ModelAttribute ReservationCreateRequest request,
            BindingResult bindingResult,
            RedirectAttributes redirectAttributes
    ) {
        // Validation 에러 처리
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldErrors().stream()
                    .findFirst()
                    .map(error -> error.getDefaultMessage())
                    .orElse("입력값을 확인해주세요.");
            redirectAttributes.addFlashAttribute("error", errorMessage);
            return "redirect:/admin/reservations/new";
        }

        try {
            Long id = reservationFacade.createReservation(request, null); // adminId는 추후 연결
            redirectAttributes.addFlashAttribute("success", "예약이 등록되었습니다.");
            return "redirect:/admin/reservations/" + id;
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
            return "redirect:/admin/reservations/new";
        }
    }

    /**
     * 예약 상세 조회
     */
    @GetMapping("/{id}")
    public String detail(@PathVariable Long id, Model model) {
        ReservationResponse reservation = reservationFacade.getReservation(id);

        model.addAttribute("currentMenu", "reservations");
        model.addAttribute("reservation", reservation);
        model.addAttribute("statuses", ReservationStatus.values());

        return "admin/reservation/detail";
    }

    /**
     * 예약 수정 폼
     */
    @GetMapping("/{id}/edit")
    public String editForm(@PathVariable Long id, Model model) {
        ReservationResponse reservation = reservationFacade.getReservation(id);

        model.addAttribute("currentMenu", "reservations");
        model.addAttribute("reservation", reservation);
        model.addAttribute("consultationTypes", ConsultationType.values());
        model.addAttribute("statuses", ReservationStatus.values());

        return "admin/reservation/edit";
    }

    /**
     * 예약 수정 처리
     */
    @PostMapping("/{id}")
    public String update(
            @PathVariable Long id,
            @Valid @ModelAttribute ReservationUpdateRequest request,
            BindingResult bindingResult,
            RedirectAttributes redirectAttributes
    ) {
        // Validation 에러 처리
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldErrors().stream()
                    .findFirst()
                    .map(error -> error.getDefaultMessage())
                    .orElse("입력값을 확인해주세요.");
            redirectAttributes.addFlashAttribute("error", errorMessage);
            return "redirect:/admin/reservations/" + id + "/edit";
        }

        try {
            reservationFacade.updateReservation(id, request);
            redirectAttributes.addFlashAttribute("success", "예약이 수정되었습니다.");
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
        }
        return "redirect:/admin/reservations/" + id;
    }

    /**
     * 예약 상태 변경 (확정)
     */
    @PostMapping("/{id}/confirm")
    public String confirm(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            reservationFacade.confirmReservation(id);
            redirectAttributes.addFlashAttribute("success", "예약이 확정되었습니다.");
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
        }
        return "redirect:/admin/reservations/" + id;
    }

    /**
     * 예약 취소
     */
    @PostMapping("/{id}/cancel")
    public String cancel(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            reservationFacade.cancelReservation(id);
            redirectAttributes.addFlashAttribute("success", "예약이 취소되었습니다.");
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
        }
        return "redirect:/admin/reservations/" + id;
    }

    /**
     * 예약 완료 처리
     */
    @PostMapping("/{id}/complete")
    public String complete(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            reservationFacade.completeReservation(id);
            redirectAttributes.addFlashAttribute("success", "상담이 완료 처리되었습니다.");
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
        }
        return "redirect:/admin/reservations/" + id;
    }

    /**
     * 노쇼 처리
     */
    @PostMapping("/{id}/no-show")
    public String noShow(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            reservationFacade.markNoShow(id);
            redirectAttributes.addFlashAttribute("success", "노쇼로 처리되었습니다.");
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
        }
        return "redirect:/admin/reservations/" + id;
    }

    /**
     * 특정 날짜의 예약된 시간 목록 조회 (AJAX)
     */
    @GetMapping("/reserved-times")
    @ResponseBody
    public java.util.List<String> getReservedTimes(
            @RequestParam LocalDate date,
            @RequestParam(required = false) Long excludeId
    ) {
        if (excludeId != null) {
            return reservationFacade.getReservedTimesExcluding(date, excludeId)
                    .stream()
                    .map(time -> time.toString().substring(0, 5))
                    .toList();
        }
        return reservationFacade.getReservedTimes(date)
                .stream()
                .map(time -> time.toString().substring(0, 5))
                .toList();
    }
}