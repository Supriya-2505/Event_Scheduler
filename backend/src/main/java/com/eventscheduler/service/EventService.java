package com.eventscheduler.service;

import com.eventscheduler.dto.EventDTO;
import com.eventscheduler.entity.Event;
import com.eventscheduler.exception.EventConflictException;
import com.eventscheduler.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class EventService {
    
    private final EventRepository eventRepository;
    private final AiSuggestionService aiSuggestionService;
    
    /**
     * Get all events
     */
    @Transactional(readOnly = true)
    public List<EventDTO> getAllEvents() {
        log.info("Fetching all events");
        return eventRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get event by ID
     */
    @Transactional(readOnly = true)
    public EventDTO getEventById(Long id) {
        log.info("Fetching event with ID: {}", id);
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
        return convertToDTO(event);
    }
    
    /**
     * Create new event
     */
    public EventDTO createEvent(EventDTO eventDTO) {
        log.info("Creating new event: {}", eventDTO.getTitle());
        
        // Check for conflicts before creating
        validateNoConflict(eventDTO.getDate(), eventDTO.getTime(), eventDTO.getLocation(), null);
        
        Event event = convertToEntity(eventDTO);
        Event savedEvent = eventRepository.save(event);
        return convertToDTO(savedEvent);
    }
    
    /**
     * Update existing event
     */
    public EventDTO updateEvent(Long id, EventDTO eventDTO) {
        log.info("Updating event with ID: {}", id);
        Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
        
        // Check for conflicts before updating (excluding current event)
        validateNoConflict(eventDTO.getDate(), eventDTO.getTime(), eventDTO.getLocation(), id);
        
        // Update fields
        existingEvent.setTitle(eventDTO.getTitle());
        existingEvent.setDescription(eventDTO.getDescription());
        existingEvent.setDate(eventDTO.getDate());
        existingEvent.setTime(eventDTO.getTime());
        existingEvent.setLocation(eventDTO.getLocation());
        existingEvent.setPlace(eventDTO.getPlace());
        existingEvent.setFoodPreferences(eventDTO.getFoodPreferences());
        existingEvent.setAttendees(eventDTO.getAttendees());
        existingEvent.setStatus(eventDTO.getStatus());
        
        Event updatedEvent = eventRepository.save(existingEvent);
        return convertToDTO(updatedEvent);
    }
    
    /**
     * Delete event
     */
    public void deleteEvent(Long id) {
        log.info("Deleting event with ID: {}", id);
        if (!eventRepository.existsById(id)) {
            throw new RuntimeException("Event not found with id: " + id);
        }
        eventRepository.deleteById(id);
    }
    
    /**
     * Get events by status
     */
    @Transactional(readOnly = true)
    public List<EventDTO> getEventsByStatus(Event.EventStatus status) {
        log.info("Fetching events with status: {}", status);
        return eventRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get upcoming events
     */
    @Transactional(readOnly = true)
    public List<EventDTO> getUpcomingEvents() {
        log.info("Fetching upcoming events");
        return eventRepository.findUpcomingEvents(LocalDate.now()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get events by date
     */
    @Transactional(readOnly = true)
    public List<EventDTO> getEventsByDate(LocalDate date) {
        log.info("Fetching events for date: {}", date);
        return eventRepository.findByDate(date).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Search events by title
     */
    @Transactional(readOnly = true)
    public List<EventDTO> searchEventsByTitle(String title) {
        log.info("Searching events by title: {}", title);
        return eventRepository.findByTitleContainingIgnoreCase(title).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Validate that no event conflict exists
     */
    private void validateNoConflict(LocalDate date, LocalTime time, String location, Long excludeId) {
        if (date == null || time == null || location == null) {
            return; // Skip validation if required fields are null
        }
        
        boolean conflictExists;
        if (excludeId != null) {
            conflictExists = eventRepository.existsByDateAndTimeAndLocationExcludingId(date, time, location, excludeId);
        } else {
            conflictExists = eventRepository.existsByDateAndTimeAndLocation(date, time, location);
        }
        
        if (conflictExists) {
            String message = String.format("An event already exists at %s on %s at %s. Please choose a different date, time, or location.", 
                location, date, time);

            // Attempt to fetch AI suggestions; if it fails, suggestions will be empty
            List<String> suggestions = aiSuggestionService.suggestAlternatives(location, date, time);

            throw new EventConflictException(message, suggestions);
        }
    }
    
    /**
     * Convert Entity to DTO
     */
    private EventDTO convertToDTO(Event event) {
        EventDTO dto = new EventDTO();
        dto.setId(event.getId());
        dto.setTitle(event.getTitle());
        dto.setDescription(event.getDescription());
        dto.setDate(event.getDate());
        dto.setTime(event.getTime());
        dto.setLocation(event.getLocation());
        dto.setPlace(event.getPlace());
        dto.setFoodPreferences(event.getFoodPreferences());
        dto.setAttendees(event.getAttendees());
        dto.setStatus(event.getStatus());
        dto.setCreatedAt(event.getCreatedAt());
        dto.setUpdatedAt(event.getUpdatedAt());
        return dto;
    }
    
    /**
     * Convert DTO to Entity
     */
    private Event convertToEntity(EventDTO dto) {
        Event event = new Event();
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setDate(dto.getDate());
        event.setTime(dto.getTime());
        event.setLocation(dto.getLocation());
        event.setPlace(dto.getPlace());
        event.setFoodPreferences(dto.getFoodPreferences());
        event.setAttendees(dto.getAttendees());
        event.setStatus(dto.getStatus() != null ? dto.getStatus() : Event.EventStatus.PENDING);
        return event;
    }
}
