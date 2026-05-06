package com.project.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


public class JwtFilter implements Filter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {

    HttpServletRequest req = (HttpServletRequest) request;
    HttpServletResponse res = (HttpServletResponse) response;

    // ✅ HANDLE CORS PREFLIGHT FIRST
    if (req.getMethod().equalsIgnoreCase("OPTIONS")) {
        res.setStatus(HttpServletResponse.SC_OK);
        return;
    }

    String authHeader = req.getHeader("Authorization");

    if (authHeader != null && authHeader.startsWith("Bearer ")) {

        String token = authHeader.substring(7);

        if (!jwtUtil.validateToken(token)) {
            res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Token");
            return;
        }
    }

    chain.doFilter(request, response);
}
}