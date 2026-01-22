package com.sures.domain.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ConsultationType {
    TAX_RETURN("종합소득세 신고"),
    VAT("부가가치세"),
    CORPORATE_TAX("법인세"),
    INHERITANCE("상속세"),
    GIFT_TAX("증여세"),
    BOOKKEEPING("기장대리"),
    TAX_ADJUSTMENT("세무조정"),
    CONSULTATION("세무상담"),
    OTHER("기타");

    private final String description;
}