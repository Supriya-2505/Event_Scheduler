package com.eventscheduler.dto;

import com.eventscheduler.entity.Task;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDate dueDate;
    private Task.TaskPriority priority;
    private String assignee;
    private Boolean completed;
    private Long eventId;
    private String eventTitle;
    private java.time.LocalDateTime createdAt;
    private java.time.LocalDateTime updatedAt;
}
