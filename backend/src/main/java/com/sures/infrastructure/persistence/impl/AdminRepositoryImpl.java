package com.sures.infrastructure.persistence.impl;

import com.sures.domain.entity.Admin;
import com.sures.domain.repository.AdminRepository;
import com.sures.infrastructure.persistence.jpa.AdminJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * AdminRepository 구현체 (Domain Repository → JPA Repository)
 */
@Repository
@RequiredArgsConstructor
public class AdminRepositoryImpl implements AdminRepository {

    private final AdminJpaRepository jpaRepository;

    @Override
    public Optional<Admin> findById(Long id) {
        return jpaRepository.findById(id);
    }

    @Override
    public Optional<Admin> findByUsername(String username) {
        return jpaRepository.findByUsername(username);
    }

    @Override
    public boolean existsByUsername(String username) {
        return jpaRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return jpaRepository.existsByEmail(email);
    }

    @Override
    public Admin save(Admin admin) {
        return jpaRepository.save(admin);
    }
}
