package com.eventscheduler.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(EventConflictException.class)
    public ResponseEntity<Map<String, Object>> handleEventConflictException(EventConflictException ex) {
        log.warn("Event conflict detected: {}", ex.getMessage());
        
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("error", "Event Conflict");
        errorResponse.put("message", ex.getMessage());
        // Include AI suggestions if provided
        if (ex.getSuggestions() != null && !ex.getSuggestions().isEmpty()) {
            errorResponse.put("suggestions", ex.getSuggestions());
        } else {
            errorResponse.put("suggestions", List.of());
        }
        errorResponse.put("status", HttpStatus.CONFLICT.value());
        errorResponse.put("timestamp", LocalDateTime.now());
        
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }
    
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntimeException(RuntimeException ex) {
        log.error("Runtime exception occurred: {}", ex.getMessage(), ex);
        
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("error", "Internal Server Error");
        errorResponse.put("message", ex.getMessage());
        errorResponse.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        errorResponse.put("timestamp", LocalDateTime.now());
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
}
