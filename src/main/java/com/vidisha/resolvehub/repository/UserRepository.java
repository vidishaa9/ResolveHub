package com.vidisha.resolvehub.repository;

import com.vidisha.resolvehub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repository for User entity
 */
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by username (used in login + service layer)
    Optional<User> findByUsername(String username);
}
