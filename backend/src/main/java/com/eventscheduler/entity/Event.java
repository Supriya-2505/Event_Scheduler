package com.eventscheduler.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Event title is required")
    @Size(max = 255, message = "Event title must not exceed 255 characters")
    @Column(nullable = false)
    private String title;
    
    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotNull(message = "Event date is required")
    @Column(nullable = false)
    private LocalDate date;
    
    @NotNull(message = "Event time is required")
    @Column(nullable = false)
    private LocalTime time;
    
    @NotBlank(message = "Event location is required")
    @Size(max = 255, message = "Location must not exceed 255 characters")
    @Column(nullable = false)
    private String location;
    
    @Size(max = 255, message = "Place must not exceed 255 characters")
    @Column
    private String place;
    
    @Column(name = "attendees_count")
    private Integer attendees;
    
    @Size(max = 50, message = "Food preferences must not exceed 50 characters")
    @Column(name = "food_preferences")
    private String foodPreferences;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventStatus status = EventStatus.PENDING;
    
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Task> tasks = new ArrayList<>();
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private java.time.LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt;
    
    public enum EventStatus {
        PENDING, CONFIRMED, CANCELLED
    }
}
