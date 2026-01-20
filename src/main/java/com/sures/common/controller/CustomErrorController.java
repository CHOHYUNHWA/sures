package com.sures.common.controller;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.webmvc.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request, Model model) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        Object errorMessage = request.getAttribute(RequestDispatcher.ERROR_MESSAGE);
        Object requestUri = request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI);
        Throwable throwable = (Throwable) request.getAttribute(RequestDispatcher.ERROR_EXCEPTION);

        int statusCode = 500;
        if (status != null) {
            statusCode = Integer.parseInt(status.toString());
        }

        // 에러 로깅
        if (statusCode == 404) {
            log.warn("404 Not Found - URI: {}", requestUri);
        } else if (statusCode == 403) {
            log.warn("403 Forbidden - URI: {}", requestUri);
            model.addAttribute("errorCode", "403");
            model.addAttribute("errorMessage", "접근 권한이 없습니다");
            return "error/403";
        } else if (statusCode >= 500) {
            log.error("500 Server Error - URI: {}, Status: {}", requestUri, statusCode, throwable);
        } else {
            log.warn("Error occurred - URI: {}, Status: {}, Message: {}", requestUri, statusCode, errorMessage);
        }

        // 에러 코드별 메시지 설정
        String message;
        if (statusCode == HttpStatus.NOT_FOUND.value()) {
            message = "페이지를 찾을 수 없습니다";
        } else if (statusCode == HttpStatus.FORBIDDEN.value()) {
            message = "접근 권한이 없습니다";
        } else if (statusCode == HttpStatus.BAD_REQUEST.value()) {
            message = "잘못된 요청입니다";
        } else {
            message = "서버 오류가 발생했습니다";
        }

        model.addAttribute("errorCode", String.valueOf(statusCode));
        model.addAttribute("errorMessage", message);

        return "error/error";
    }
}