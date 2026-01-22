package com.sures.presentation.common.dto;

import com.sures.domain.common.PageResult;

import java.util.List;
import java.util.function.Function;

/**
 * 페이징 응답 형식
 */
public record PageResponse<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean hasNext,
        boolean hasPrevious,
        boolean isFirst,
        boolean isLast
) {
    /**
     * PageResult → PageResponse 변환
     */
    public static <T, R> PageResponse<R> from(PageResult<T> pageResult, Function<T, R> mapper) {
        List<R> mappedContent = pageResult.content().stream()
                .map(mapper)
                .toList();

        return new PageResponse<>(
                mappedContent,
                pageResult.page(),
                pageResult.size(),
                pageResult.totalElements(),
                pageResult.totalPages(),
                pageResult.hasNext(),
                pageResult.hasPrevious(),
                pageResult.isFirst(),
                pageResult.isLast()
        );
    }

    /**
     * PageResult → PageResponse 변환 (동일 타입)
     */
    public static <T> PageResponse<T> from(PageResult<T> pageResult) {
        return new PageResponse<>(
                pageResult.content(),
                pageResult.page(),
                pageResult.size(),
                pageResult.totalElements(),
                pageResult.totalPages(),
                pageResult.hasNext(),
                pageResult.hasPrevious(),
                pageResult.isFirst(),
                pageResult.isLast()
        );
    }
}
