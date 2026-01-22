package com.sures.domain.vo;

/**
 * 페이징 요청 VO (Spring 의존성 없음)
 */
public record PageRequest(int page, int size) {

    public PageRequest {
        if (page < 0) {
            throw new IllegalArgumentException("페이지 번호는 0 이상이어야 합니다.");
        }
        if (size < 1) {
            throw new IllegalArgumentException("페이지 크기는 1 이상이어야 합니다.");
        }
    }

    public static PageRequest of(int page, int size) {
        return new PageRequest(page, size);
    }

    public int getOffset() {
        return page * size;
    }
}
