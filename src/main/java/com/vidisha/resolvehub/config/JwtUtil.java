package com.vidisha.resolvehub.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey key;

    @Value("${jwt.expiration}")
    private long expiration;

    public JwtUtil(@Value("${jwt.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // 🔐 Generate Token (OLD STYLE FIXED)
    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)   // ✅ OLD METHOD
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key, SignatureAlgorithm.HS256) // ✅ OLD SIGNING
                .compact();
    }

    // 🔍 Parse Token
    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)   // ✅ OLD STYLE
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // 👤 Username
    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    // 🔑 Role
    public String extractRole(String token) {
        return getClaims(token).get("role", String.class);
    }
}