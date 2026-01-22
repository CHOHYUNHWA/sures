package com.sures.presentation.customer.dto.request;

import com.sures.application.customer.dto.command.CustomerVerifyReservationCommand;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CustomerReservationVerifyRequest(
        @NotBlank(message = "고객명을 입력해주세요")
        String customerName,

        @NotBlank(message = "연락처를 입력해주세요")
        @Pattern(regexp = "^010-\\d{4}-\\d{4}$", message = "연락처는 010-0000-0000 형식으로 입력해주세요")
        String phone,

        @NotBlank(message = "예약번호를 입력해주세요")
        String reservationNumber
) {
    /**
     * Request → Command 변환
     */
    public CustomerVerifyReservationCommand toCommand() {
        return new CustomerVerifyReservationCommand(customerName, phone, reservationNumber);
    }
}
