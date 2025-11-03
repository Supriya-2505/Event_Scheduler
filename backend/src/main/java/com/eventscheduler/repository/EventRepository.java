package com.eventscheduler.repository;

import com.eventscheduler.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    
    /**
     * Find events by status
     */
    List<Event> findByStatus(Event.EventStatus status);
    
    /**
     * Find events by date range
     */
    List<Event> findByDateBetween(LocalDate startDate, LocalDate endDate);
    
    /**
     * Find upcoming events (from today onwards)
     */
    @Query("SELECT e FROM Event e WHERE e.date >= :today ORDER BY e.date ASC, e.time ASC")
    List<Event> findUpcomingEvents(@Param("today") LocalDate today);
    
    /**
     * Find events by date
     */
    List<Event> findByDate(LocalDate date);
    
    /**
     * Find events by title containing (case insensitive)
     */
    List<Event> findByTitleContainingIgnoreCase(String title);
    
    /**
     * Find events by location containing (case insensitive)
     */
    List<Event> findByLocationContainingIgnoreCase(String location);
    
    /**
     * Count events by status
     */
    long countByStatus(Event.EventStatus status);
    
    /**
     * Count events created before a specific date
     */
    @Query("SELECT COUNT(e) FROM Event e WHERE e.date < :date")
    long countByDateBefore(@Param("date") LocalDate date);
    
    /**
     * Count upcoming events before a specific date
     */
    @Query("SELECT COUNT(e) FROM Event e WHERE e.date >= :date")
    long countUpcomingEventsBefore(@Param("date") LocalDate date);
    
    /**
     * Find events with tasks
     */
    @Query("SELECT DISTINCT e FROM Event e LEFT JOIN FETCH e.tasks WHERE e.id = :eventId")
    Event findByIdWithTasks(@Param("eventId") Long eventId);
    
    /**
     * Check if an event exists with the same date, time, and location
     */
    @Query("SELECT COUNT(e) > 0 FROM Event e WHERE e.date = :date AND e.time = :time AND e.location = :location")
    boolean existsByDateAndTimeAndLocation(@Param("date") LocalDate date, @Param("time") LocalTime time, @Param("location") String location);
    
    /**
     * Check if an event exists with the same date, time, and location (excluding a specific event ID)
     */
    @Query("SELECT COUNT(e) > 0 FROM Event e WHERE e.date = :date AND e.time = :time AND e.location = :location AND e.id != :excludeId")
    boolean existsByDateAndTimeAndLocationExcludingId(@Param("date") LocalDate date, @Param("time") LocalTime time, @Param("location") String location, @Param("excludeId") Long excludeId);
}
