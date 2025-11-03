package com.eventscheduler.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Slf4j
public class Task {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Task title is required")
    @Size(max = 255, message = "Task title must not exceed 255 characters")
    @Column(nullable = false)
    private String title;
    
    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "due_date")
    private LocalDate dueDate;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskPriority priority = TaskPriority.MEDIUM;
    
    @Size(max = 100, message = "Assignee name must not exceed 100 characters")
    private String assignee;
    
    @Column(nullable = false)
    private Boolean completed = false;
    
    @Column(name = "completion_date")
    private LocalDate completionDate;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id")
    private Event event;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private java.time.LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt;
    
    public enum TaskPriority {
        LOW, MEDIUM, HIGH
    }
}
