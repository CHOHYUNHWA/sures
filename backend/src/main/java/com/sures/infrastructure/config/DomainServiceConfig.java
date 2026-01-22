package com.sures.infrastructure.config;

import com.sures.domain.repository.AdminRepository;
import com.sures.domain.repository.ReservationRepository;
import com.sures.domain.service.AdminDomainService;
import com.sures.domain.service.ReservationDomainService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Domain Service Bean 등록 Configuration
 * Domain Service는 Spring 의존성이 없으므로 수동 Bean 등록 필요
 */
@Configuration
public class DomainServiceConfig {

    @Bean
    public AdminDomainService adminDomainService(AdminRepository adminRepository) {
        return new AdminDomainService(adminRepository);
    }

    @Bean
    public ReservationDomainService reservationDomainService(ReservationRepository reservationRepository) {
        return new ReservationDomainService(reservationRepository);
    }
}
