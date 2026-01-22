package com.sures.domain.vo;

import java.util.List;
import java.util.function.Function;

/**
 * 페이징 결과 VO (Spring 의존성 없음)
 */
public record PageResult<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages
) {

    public static <T> PageResult<T> of(List<T> content, int page, int size, long totalElements) {
        int totalPages = (int) Math.ceil((double) totalElements / size);
        return new PageResult<>(content, page, size, totalElements, totalPages);
    }

    public <R> PageResult<R> map(Function<T, R> mapper) {
        List<R> mappedContent = content.stream().map(mapper).toList();
        return new PageResult<>(mappedContent, page, size, totalElements, totalPages);
    }

    public boolean hasNext() {
        return page < totalPages - 1;
    }

    public boolean hasPrevious() {
        return page > 0;
    }

    public boolean isEmpty() {
        return content.isEmpty();
    }

    public boolean isFirst() {
        return page == 0;
    }

    public boolean isLast() {
        return page >= totalPages - 1;
    }
}
