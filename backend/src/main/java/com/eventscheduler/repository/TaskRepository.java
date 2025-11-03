package com.eventscheduler.repository;

import com.eventscheduler.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    /**
     * Find tasks by completion status
     */
    List<Task> findByCompleted(Boolean completed);
    
    /**
     * Find tasks by priority
     */
    List<Task> findByPriority(Task.TaskPriority priority);
    
    /**
     * Find tasks by assignee
     */
    List<Task> findByAssignee(String assignee);
    
    /**
     * Find tasks by event
     */
    List<Task> findByEventId(Long eventId);
    
    /**
     * Find overdue tasks (due date is before today and not completed)
     */
    @Query("SELECT t FROM Task t WHERE t.dueDate < :today AND t.completed = false")
    List<Task> findOverdueTasks(@Param("today") LocalDate today);
    
    /**
     * Find tasks due today
     */
    @Query("SELECT t FROM Task t WHERE t.dueDate = :today")
    List<Task> findTasksDueToday(@Param("today") LocalDate today);
    
    /**
     * Find tasks by due date range
     */
    List<Task> findByDueDateBetween(LocalDate startDate, LocalDate endDate);
    
    /**
     * Count tasks by completed status and due date before a specific date
     */
    @Query("SELECT COUNT(t) FROM Task t WHERE t.completed = :completed AND t.dueDate < :date")
    long countByCompletedAndDueDateBefore(@Param("completed") boolean completed, @Param("date") LocalDate date);
    
    /**
     * Count tasks by completed status and completion date before a specific date
     */
    @Query("SELECT COUNT(t) FROM Task t WHERE t.completed = :completed AND t.completionDate < :date")
    long countByCompletedAndCompletionDateBefore(@Param("completed") boolean completed, @Param("date") LocalDate date);
    
    /**
     * Find tasks by title containing (case insensitive)
     */
    List<Task> findByTitleContainingIgnoreCase(String title);
    
    /**
     * Count tasks by completion status
     */
    long countByCompleted(Boolean completed);
    
    /**
     * Count tasks by priority
     */
    long countByPriority(Task.TaskPriority priority);
    
    /**
     * Find tasks with event information
     */
    @Query("SELECT t FROM Task t LEFT JOIN FETCH t.event WHERE t.id = :taskId")
    Task findByIdWithEvent(@Param("taskId") Long taskId);

    // Add this to TaskRepository.java
    /*@Query("SELECT COUNT(t) FROM Task t WHERE t.completed = :completed")
    long countByCompleted(@Param("completed") Boolean completed);*/
}
