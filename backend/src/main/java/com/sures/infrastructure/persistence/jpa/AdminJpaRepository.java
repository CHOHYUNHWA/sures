package com.sures.infrastructure.persistence.jpa;

import com.sures.domain.admin.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Admin JPA Repository (Spring Data JPA)
 */
public interface AdminJpaRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
