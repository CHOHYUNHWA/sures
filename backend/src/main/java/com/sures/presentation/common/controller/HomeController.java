package com.sures.presentation.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    /**
     * 루트 경로 -> 고객 랜딩페이지로 리다이렉트
     */
    @GetMapping("/")
    public String home() {
        return "redirect:/customer";
    }
}
