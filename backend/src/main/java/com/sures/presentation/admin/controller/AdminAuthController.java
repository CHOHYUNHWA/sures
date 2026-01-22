package com.sures.presentation.admin.controller;

import com.sures.presentation.admin.dto.AdminSignupRequest;
import com.sures.application.facade.AdminFacade;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminAuthController {

    private final AdminFacade adminFacade;

    /**
     * 로그인 페이지
     */
    @GetMapping("/login")
    public String loginForm() {
        return "admin/auth/login";
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
    public String register(@Valid @ModelAttribute AdminSignupRequest request,
                           BindingResult bindingResult,
                           RedirectAttributes redirectAttributes) {
        // Validation 에러 처리
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldErrors().stream()
                    .findFirst()
                    .map(error -> error.getDefaultMessage())
                    .orElse("입력값을 확인해주세요.");
            redirectAttributes.addFlashAttribute("error", errorMessage);
            return "redirect:/admin/register";
        }

        // 비밀번호 확인 체크
        if (!request.isPasswordMatching()) {
            redirectAttributes.addFlashAttribute("error", "비밀번호가 일치하지 않습니다.");
            return "redirect:/admin/register";
        }

        try {
            adminFacade.signup(request);
            redirectAttributes.addFlashAttribute("success", "회원가입이 완료되었습니다. 로그인해주세요.");
            return "redirect:/admin/login";
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
            return "redirect:/admin/register";
        }
    }

    /**
     * 계정 찾기 페이지
     */
    @GetMapping("/find-account")
    public String findAccountForm() {
        return "admin/auth/find-account";
    }
}