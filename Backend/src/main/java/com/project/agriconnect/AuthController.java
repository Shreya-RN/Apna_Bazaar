package com.project.agriconnect;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.config.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository repo;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return repo.save(user);
    }

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
public Map<String, Object> login(@RequestBody User user) {

    User existing = repo.findByPhone(user.getPhone())
            .orElseThrow(() -> new RuntimeException("User not registered"));

    if (!existing.getPassword().equals(user.getPassword())) {
        throw new RuntimeException("Invalid password");
    }

    String token = jwtUtil.generateToken(user.getPhone());

    return Map.of(
        "token", token,
        "user", existing   // ✅ ADD THIS
    );
}
@GetMapping("/profile")
public Map<String, Object> getProfile(HttpServletRequest request) {

    String authHeader = request.getHeader("Authorization");

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        throw new RuntimeException("No token");
    }

    String token = authHeader.substring(7);
    String phone = jwtUtil.extractPhone(token);

    User user = repo.findByPhone(phone)
            .orElseThrow(() -> new RuntimeException("User not found"));

    return Map.of("user", user);
}
}