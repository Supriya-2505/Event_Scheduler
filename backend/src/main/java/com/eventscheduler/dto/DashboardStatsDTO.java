package com.eventscheduler.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    private long totalEvents;
    private long upcomingEvents;
    private long pendingTasks;
    private long completedTasks;
    private int totalEventsTrend;
    private int upcomingEventsTrend;
    private int pendingTasksTrend;
    private int completedTasksTrend;
}
