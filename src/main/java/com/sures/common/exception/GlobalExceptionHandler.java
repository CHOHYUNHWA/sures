package com.sures.common.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 404 - 페이지를 찾을 수 없음
     */
    @ExceptionHandler({NoHandlerFoundException.class, NoResourceFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleNotFoundException(Exception ex, HttpServletRequest request, Model model) {
        log.warn("404 Not Found - URI: {}, Method: {}",
                request.getRequestURI(), request.getMethod());

        model.addAttribute("errorCode", "404");
        model.addAttribute("errorMessage", "페이지를 찾을 수 없습니다");
        return "error/error";
    }

    /**
     * 400 - 잘못된 요청 (IllegalArgumentException)
     */
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleIllegalArgumentException(IllegalArgumentException ex,
                                                  HttpServletRequest request, Model model) {
        log.warn("400 Bad Request - URI: {}, Message: {}",
                request.getRequestURI(), ex.getMessage());

        model.addAttribute("errorCode", "400");
        model.addAttribute("errorMessage", ex.getMessage());
        return "error/error";
    }

    /**
     * 500 - 서버 내부 오류 (모든 예외)
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleException(Exception ex, HttpServletRequest request, Model model) {
        log.error("500 Internal Server Error - URI: {}, Method: {}",
                request.getRequestURI(), request.getMethod(), ex);

        model.addAttribute("errorCode", "500");
        model.addAttribute("errorMessage", "서버 오류가 발생했습니다");
        return "error/error";
    }
}