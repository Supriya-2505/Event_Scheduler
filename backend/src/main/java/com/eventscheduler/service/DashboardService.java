package com.eventscheduler.service;

import com.eventscheduler.dto.DashboardStatsDTO;
import com.eventscheduler.entity.Event;
import com.eventscheduler.entity.Task;
import com.eventscheduler.repository.EventRepository;
import com.eventscheduler.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class DashboardService {
    
    private final EventRepository eventRepository;
    private final TaskRepository taskRepository;
    
    /**
     * Get dashboard statistics
     */
    public DashboardStatsDTO getDashboardStats() {
        log.info("Fetching dashboard statistics");
        
        LocalDate now = LocalDate.now();
        LocalDate oneMonthAgo = now.minusMonths(1);
        
        // Current month stats
        long totalEvents = eventRepository.count();
        long upcomingEvents = eventRepository.findUpcomingEvents(now).size();
        long pendingTasks = taskRepository.countByCompleted(false);
        long completedTasks = taskRepository.countByCompleted(true);
        
        // Previous month stats for comparison
        long lastMonthTotalEvents = eventRepository.countByDateBefore(oneMonthAgo);
        long lastMonthUpcomingEvents = eventRepository.findUpcomingEvents(oneMonthAgo).size();
        long lastMonthPendingTasks = taskRepository.countByCompletedAndDueDateBefore(false, oneMonthAgo);
        long lastMonthCompletedTasks = taskRepository.countByCompletedAndCompletionDateBefore(true, oneMonthAgo);
        
        // Calculate trends (percentage change)
        int totalEventsTrend = calculateTrend(lastMonthTotalEvents, totalEvents);
        int upcomingEventsTrend = calculateTrend(lastMonthUpcomingEvents, upcomingEvents);
        int pendingTasksTrend = calculateTrend(lastMonthPendingTasks, pendingTasks);
        int completedTasksTrend = calculateTrend(lastMonthCompletedTasks, completedTasks);
        
        return new DashboardStatsDTO(
                totalEvents,
                upcomingEvents,
                pendingTasks,
                completedTasks,
                totalEventsTrend,
                upcomingEventsTrend,
                pendingTasksTrend,
                completedTasksTrend
        );
    }
    
    /**
     * Calculate percentage change between two values
     */
    private int calculateTrend(long oldValue, long newValue) {
        if (oldValue == 0) {
            return newValue > 0 ? 100 : 0;
        }
        return (int) (((newValue - oldValue) / (double) oldValue) * 100);
    }
}
