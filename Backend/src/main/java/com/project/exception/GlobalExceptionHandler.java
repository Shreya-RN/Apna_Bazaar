package com.project.exception;

import java.util.Map;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public Map<String, Object> handleGeneral(Exception ex) {
        return Map.of(
                "message", ex.getMessage(),
                "status", 500
        );
    }

    @ExceptionHandler(RuntimeException.class)
    public Map<String, Object> handleRuntime(RuntimeException ex) {
        return Map.of(
                "message", ex.getMessage(),
                "status", 400
        );
    }
}
