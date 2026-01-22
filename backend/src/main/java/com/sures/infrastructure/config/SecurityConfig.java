package com.sures.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                // 정적 리소스 허용
                .requestMatchers("/css/**", "/js/**", "/image/**").permitAll()
                // 고객 페이지 전체 허용
                .requestMatchers("/customer/**").permitAll()
                // 관리자 로그인/회원가입 허용
                .requestMatchers("/admin/login", "/admin/register", "/admin/find-account").permitAll()
                // 에러 페이지 허용
                .requestMatchers("/error/**").permitAll()
                // 예약 관리 기능은 SUPER_ADMIN만 허용
                .requestMatchers("/admin/reservations/**").hasRole("SUPER_ADMIN")
                // 그 외 관리자 페이지는 인증만 필요
                .requestMatchers("/admin/**").authenticated()
                // 그 외 모든 요청 허용
                .anyRequest().permitAll()
            )
            .formLogin(form -> form
                .loginPage("/admin/login")
                .loginProcessingUrl("/admin/login")
                .defaultSuccessUrl("/admin/reservations", true)
                .failureUrl("/admin/login?error=true")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/admin/logout")
                .logoutSuccessUrl("/admin/login?logout=true")
                .invalidateHttpSession(true)
                .deleteCookies("SURES_SESSION")
                .permitAll()
            )
            .sessionManagement(session -> session
                .maximumSessions(5) // 동시 세션 최대 5개 허용
                .maxSessionsPreventsLogin(false) // 새 로그인 시 기존 세션 만료 (6번째부터)
            )
            .exceptionHandling(exception -> exception
                .accessDeniedPage("/error/403") // 권한 없음 페이지
            );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
