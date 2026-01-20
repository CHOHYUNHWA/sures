package com.sures.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/reservations")
public class AdminReservationController {

    /**
     * 예약 목록 (검색, 필터 지원)
     */
    @GetMapping
    public String list(Model model) {
        model.addAttribute("currentMenu", "reservations");
        // TODO: 예약 목록 조회 로직
        return "admin/reservation/list";
    }

    /**
     * 예약 등록 폼
     */
    @GetMapping("/new")
    public String createForm(Model model) {
        model.addAttribute("currentMenu", "new");
        return "admin/reservation/create";
    }

    /**
     * 예약 등록 처리
     */
    @PostMapping
    public String create() {
        // TODO: 예약 생성 로직
        return "redirect:/admin/reservations";
    }

    /**
     * 예약 상세 조회
     */
    @GetMapping("/{id}")
    public String detail(@PathVariable Long id, Model model) {
        model.addAttribute("currentMenu", "reservations");
        model.addAttribute("reservationId", id);
        // TODO: 예약 상세 조회 로직
        return "admin/reservation/detail";
    }

    /**
     * 예약 수정 폼
     */
    @GetMapping("/{id}/edit")
    public String editForm(@PathVariable Long id, Model model) {
        model.addAttribute("currentMenu", "reservations");
        model.addAttribute("reservationId", id);
        // TODO: 예약 조회 로직
        return "admin/reservation/edit";
    }

    /**
     * 예약 수정 처리
     */
    @PutMapping("/{id}")
    public String update(@PathVariable Long id) {
        // TODO: 예약 수정 로직
        return "redirect:/admin/reservations/" + id;
    }

    /**
     * 예약 취소
     */
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        // TODO: 예약 취소 로직
        return "redirect:/admin/reservations";
    }
}
