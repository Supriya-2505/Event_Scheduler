package com.eventscheduler.controller;

import com.eventscheduler.dto.EventDTO;
import com.eventscheduler.entity.Event;
import com.eventscheduler.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(
    origins = {"http://localhost:3000", "https://localhost:3000"},
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS},
    allowCredentials = "true"
)
public class EventController {
    
    private final EventService eventService;
    
    /**
     * Get all events
     */
    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        log.info("GET /events - Fetching all events");
        List<EventDTO> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }
    
    /**
     * Get event by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long id) {
        log.info("GET /events/{} - Fetching event by ID", id);
        EventDTO event = eventService.getEventById(id);
        return ResponseEntity.ok(event);
    }
    
    /**
     * Create new event
     */
    @PostMapping
    public ResponseEntity<EventDTO> createEvent(@Valid @RequestBody EventDTO eventDTO) {
        log.info("POST /events - Creating new event: {}", eventDTO.getTitle());
        EventDTO createdEvent = eventService.createEvent(eventDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent);
    }
    
    /**
     * Update existing event
     */
    @PutMapping("/{id}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Long id, @Valid @RequestBody EventDTO eventDTO) {
        log.info("PUT /events/{} - Updating event", id);
        EventDTO updatedEvent = eventService.updateEvent(id, eventDTO);
        return ResponseEntity.ok(updatedEvent);
    }
    
    /**
     * Delete event
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        log.info("DELETE /events/{} - Deleting event", id);
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
    
    /**
     * Get events by status
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<EventDTO>> getEventsByStatus(@PathVariable Event.EventStatus status) {
        log.info("GET /events/status/{} - Fetching events by status", status);
        List<EventDTO> events = eventService.getEventsByStatus(status);
        return ResponseEntity.ok(events);
    }
    
    /**
     * Get upcoming events
     */
    @GetMapping("/upcoming")
    public ResponseEntity<List<EventDTO>> getUpcomingEvents() {
        log.info("GET /events/upcoming - Fetching upcoming events");
        List<EventDTO> events = eventService.getUpcomingEvents();
        return ResponseEntity.ok(events);
    }
    
    /**
     * Get events by date
     */
    @GetMapping("/date/{date}")
    public ResponseEntity<List<EventDTO>> getEventsByDate(@PathVariable LocalDate date) {
        log.info("GET /events/date/{} - Fetching events by date", date);
        List<EventDTO> events = eventService.getEventsByDate(date);
        return ResponseEntity.ok(events);
    }
    
    /**
     * Search events by title
     */
    @GetMapping("/search")
    public ResponseEntity<List<EventDTO>> searchEventsByTitle(@RequestParam String title) {
        log.info("GET /events/search?title={} - Searching events by title", title);
        List<EventDTO> events = eventService.searchEventsByTitle(title);
        return ResponseEntity.ok(events);
    }
}
