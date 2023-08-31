package com.betulaltindis.userService.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.betulaltindis.userService.config.JwtService;
import com.betulaltindis.userService.user.User;
import com.betulaltindis.userService.user.UserRepository;
import com.betulaltindis.userService.user.UserRole;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager aManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .userName(request.getUserName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .userRole(UserRole.USER)
                .build();
        userRepository.save(user);
        return generateToken(user);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        aManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        return generateToken(user);
    }

    private AuthenticationResponse generateToken(User user){
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getUserRole().toString())
                .userId(user.getId())
                .build();
    }

}
