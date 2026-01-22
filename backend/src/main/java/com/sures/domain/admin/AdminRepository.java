package com.sures.domain.admin;

import java.util.Optional;

/**
 * 관리자 Repository 인터페이스 (순수 도메인 - Spring 의존성 없음)
 */
public interface AdminRepository {

    Optional<Admin> findById(Long id);

    Optional<Admin> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    Admin save(Admin admin);
}
