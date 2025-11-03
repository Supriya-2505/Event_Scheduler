package com.eventscheduler.service;

import com.eventscheduler.dto.AuthResponse;
import com.eventscheduler.dto.LoginRequest;
import com.eventscheduler.dto.RegisterRequest;
import com.eventscheduler.entity.User;
import com.eventscheduler.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        var user = new User(
                null,
                request.getUsername(),
                passwordEncoder.encode(request.getPassword()),
                request.getEmail(),
                request.getFullName()
        );

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        userRepository.save(user);
        var jwt = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwt)
                .username(user.getUsername())
                .fullName(user.getFullName())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwt = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwt)
                .username(user.getUsername())
                .fullName(user.getFullName())
                .build();
    }
}