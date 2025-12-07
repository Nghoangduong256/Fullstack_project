package com.vti.springdatajpa.controller;

import com.vti.springdatajpa.dto.LoginRequest;
import com.vti.springdatajpa.dto.LoginResponse;
import com.vti.springdatajpa.dto.RegisterRequest;
import com.vti.springdatajpa.entity.AccountEntity;
import com.vti.springdatajpa.service.AccountService;
import com.vti.springdatajpa.service.CustomUserDetailsService;
import com.vti.springdatajpa.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // B1: xác thực username/password
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword())
            );

        // B2: nếu không exception → OK
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());

        // B3: tạo JWT
        String token = jwtService.generateToken(userDetails);

        return ResponseEntity.ok(new LoginResponse(token, userDetails.getUsername()));


    }

//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
//        try {
//            AccountEntity newAccount = accountService.register(request.getUsername(), request.getPassword(), request.getEmail(),
//                    request.getFullName(), request.getDepartmentId(), request.getPositionId());
//            return ResponseEntity.ok("User registered: " + newAccount.getUserName());
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
}

