package com.sures.presentation.admin.dto.request;

import com.sures.application.admin.dto.command.AdminSignupCommand;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AdminSignupRequest(
        @NotBlank(message = "아이디를 입력해주세요")
        @Size(min = 4, max = 20, message = "아이디는 4~20자로 입력해주세요")
        @Pattern(regexp = "^[a-z0-9]+$", message = "아이디는 영문 소문자와 숫자만 사용 가능합니다")
        String username,

        @NotBlank(message = "비밀번호를 입력해주세요")
        @Size(min = 8, message = "비밀번호는 8자 이상이어야 합니다")
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]+$",
                message = "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다")
        String password,

        @NotBlank(message = "비밀번호 확인을 입력해주세요")
        String passwordConfirm,

        @NotBlank(message = "이름을 입력해주세요")
        @Size(min = 2, max = 20, message = "이름은 2~20자로 입력해주세요")
        String name,

        @NotBlank(message = "이메일을 입력해주세요")
        @Email(message = "올바른 이메일 형식이 아닙니다")
        String email
) {
    public boolean isPasswordMatching() {
        return password != null && password.equals(passwordConfirm);
    }

    /**
     * Request → Command 변환
     */
    public AdminSignupCommand toCommand() {
        return new AdminSignupCommand(username, password, passwordConfirm, name, email);
    }
}
