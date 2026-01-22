package com.sures.presentation.customer.dto.request;

import com.sures.application.customer.dto.command.CustomerUpdateReservationCommand;
import com.sures.domain.reservation.ConsultationType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record CustomerReservationUpdateRequest(
        @Email(message = "올바른 이메일 형식이 아닙니다")
        String email,

        ConsultationType consultationType,

        @Size(max = 500, message = "메모는 500자 이내로 입력해주세요")
        String memo
) {
    /**
     * Request → Command 변환
     */
    public CustomerUpdateReservationCommand toCommand() {
        return new CustomerUpdateReservationCommand(email, consultationType, memo);
    }
}
