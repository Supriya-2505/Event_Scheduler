package com.eventscheduler.controller;

import com.eventscheduler.dto.DashboardStatsDTO;
import com.eventscheduler.dto.EventDTO;
import com.eventscheduler.dto.TaskDTO;
import com.eventscheduler.service.DashboardService;
import com.eventscheduler.service.EventService;
import com.eventscheduler.service.TaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {
    
    private final DashboardService dashboardService;
    private final EventService eventService;
    private final TaskService taskService;
    
    /**
     * Get dashboard statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        log.info("GET /dashboard/stats - Fetching dashboard statistics");
        DashboardStatsDTO stats = dashboardService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }
    
    /**
     * Get upcoming events for dashboard
     */
    @GetMapping("/upcoming-events")
    public ResponseEntity<List<EventDTO>> getUpcomingEvents() {
        log.info("GET /dashboard/upcoming-events - Fetching upcoming events for dashboard");
        List<EventDTO> events = eventService.getUpcomingEvents();
        return ResponseEntity.ok(events);
    }
    
    /**
     * Get recent tasks for dashboard
     */
    @GetMapping("/recent-tasks")
    public ResponseEntity<List<TaskDTO>> getRecentTasks() {
        log.info("GET /dashboard/recent-tasks - Fetching recent tasks for dashboard");
        List<TaskDTO> tasks = taskService.getAllTasks();
        // Limit to first 10 tasks for dashboard
        if (tasks.size() > 10) {
            tasks = tasks.subList(0, 10);
        }
        return ResponseEntity.ok(tasks);
    }
    
    /**
     * Get overdue tasks for dashboard
     */
    @GetMapping("/overdue-tasks")
    public ResponseEntity<List<TaskDTO>> getOverdueTasks() {
        log.info("GET /dashboard/overdue-tasks - Fetching overdue tasks for dashboard");
        List<TaskDTO> tasks = taskService.getOverdueTasks();
        return ResponseEntity.ok(tasks);
    }
}
