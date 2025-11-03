package com.eventscheduler.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.eventscheduler.entity.Event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDate date;
    private LocalTime time;
    private String location;
    private String place;
    private Integer attendees;
    private String foodPreferences;
    private Event.EventStatus status;
    private List<TaskDTO> tasks;
    private java.time.LocalDateTime createdAt;
    private java.time.LocalDateTime updatedAt;
}
