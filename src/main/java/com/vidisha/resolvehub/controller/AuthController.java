package com.vidisha.resolvehub.controller;

import com.vidisha.resolvehub.config.JwtUtil;
import com.vidisha.resolvehub.dto.AuthRequest;
import com.vidisha.resolvehub.dto.AuthResponse;
import com.vidisha.resolvehub.model.User;
import com.vidisha.resolvehub.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // 🔐 REGISTER
    @PostMapping("/register")
    public String register(@RequestBody AuthRequest request) {

        // validation
        if (request.getUsername() == null || request.getPassword() == null) {
            throw new RuntimeException("Username or Password cannot be null");
        }

        // check duplicate
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        // role handling
        String role = request.getRole();

        if (role == null || role.isEmpty()) {
            role = "ROLE_USER";
        }

        if (!role.equals("ROLE_USER") && !role.equals("ROLE_ADMIN")) {
            throw new RuntimeException("Invalid role");
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();

        userRepository.save(user);

        return "User registered successfully";
    }

    // 🔐 LOGIN
    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

        return new AuthResponse(token);
    }
}