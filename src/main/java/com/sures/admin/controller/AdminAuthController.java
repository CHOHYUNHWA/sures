package com.sures.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminAuthController {

    /**
     * 로그인 페이지
     */
    @GetMapping("/login")
    public String loginForm() {
        return "admin/auth/login";
    }

    /**
     * 로그인 처리 (Spring Security가 처리)
     */
    @PostMapping("/login")
    public String login() {
        // Spring Security에서 처리
        return "redirect:/admin/reservations";
    }

    /**
     * 회원가입 페이지
     */
    @GetMapping("/register")
    public String registerForm() {
        return "admin/auth/register";
    }

    /**
     * 회원가입 처리
     */
    @PostMapping("/register")
    public String register() {
        // TODO: 회원가입 로직
        return "redirect:/admin/login";
    }

    /**
     * 계정 찾기 페이지
     */
    @GetMapping("/find-account")
    public String findAccountForm() {
        return "admin/auth/find-account";
    }
}
