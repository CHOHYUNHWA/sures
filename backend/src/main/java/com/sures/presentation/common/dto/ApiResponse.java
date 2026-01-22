package com.sures.presentation.common.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * API 공통 응답 형식
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(
        T data,
        String message,
        ErrorInfo error
) {
    /**
     * 성공 응답 (데이터 포함)
     */
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(data, "성공", null);
    }

    /**
     * 성공 응답 (메시지만)
     */
    public static <T> ApiResponse<T> success(String message) {
        return new ApiResponse<>(null, message, null);
    }

    /**
     * 성공 응답 (데이터 + 메시지)
     */
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(data, message, null);
    }

    /**
     * 에러 응답
     */
    public static <T> ApiResponse<T> error(String code, String message) {
        return new ApiResponse<>(null, null, new ErrorInfo(code, message, null));
    }

    /**
     * 에러 응답 (상세 정보 포함)
     */
    public static <T> ApiResponse<T> error(String code, String message, Object details) {
        return new ApiResponse<>(null, null, new ErrorInfo(code, message, details));
    }

    /**
     * 에러 정보
     */
    public record ErrorInfo(
            String code,
            String message,
            Object details
    ) {}
}
