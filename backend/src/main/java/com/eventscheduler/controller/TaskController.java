package com.eventscheduler.controller;

import com.eventscheduler.dto.TaskDTO;
import com.eventscheduler.entity.Task;
import com.eventscheduler.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    
    private final TaskService taskService;
    
    /**
     * Get all tasks
     */
    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        log.info("GET /tasks - Fetching all tasks");
        List<TaskDTO> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }
    
    /**
     * Get task by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long id) {
        log.info("GET /tasks/{} - Fetching task by ID", id);
        TaskDTO task = taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }
    
    /**
     * Create new task
     */
    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@Valid @RequestBody TaskDTO taskDTO) {
        log.info("POST /tasks - Creating new task: {}", taskDTO.getTitle());
        TaskDTO createdTask = taskService.createTask(taskDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }
    
    /**
     * Update existing task
     */
    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long id, @Valid @RequestBody TaskDTO taskDTO) {
        log.info("PUT /tasks/{} - Updating task", id);
        TaskDTO updatedTask = taskService.updateTask(id, taskDTO);
        return ResponseEntity.ok(updatedTask);
    }
    
    /**
     * Delete task
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        log.info("DELETE /tasks/{} - Deleting task", id);
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
    
    /**
     * Toggle task completion status
     */
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<TaskDTO> toggleTaskCompletion(@PathVariable Long id) {
        log.info("PATCH /tasks/{}/toggle - Toggling task completion", id);
        TaskDTO updatedTask = taskService.toggleTaskCompletion(id);
        return ResponseEntity.ok(updatedTask);
    }
    
    /**
     * Get tasks by completion status
     */
    @GetMapping("/status/{completed}")
    public ResponseEntity<List<TaskDTO>> getTasksByCompletionStatus(@PathVariable Boolean completed) {
        log.info("GET /tasks/status/{} - Fetching tasks by completion status", completed);
        List<TaskDTO> tasks = taskService.getTasksByCompletionStatus(completed);
        return ResponseEntity.ok(tasks);
    }
    
    /**
     * Get tasks by priority
     */
    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<TaskDTO>> getTasksByPriority(@PathVariable Task.TaskPriority priority) {
        log.info("GET /tasks/priority/{} - Fetching tasks by priority", priority);
        List<TaskDTO> tasks = taskService.getTasksByPriority(priority);
        return ResponseEntity.ok(tasks);
    }
    
    /**
     * Get tasks by event
     */
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<TaskDTO>> getTasksByEvent(@PathVariable Long eventId) {
        log.info("GET /tasks/event/{} - Fetching tasks by event", eventId);
        List<TaskDTO> tasks = taskService.getTasksByEvent(eventId);
        return ResponseEntity.ok(tasks);
    }
    
    /**
     * Get overdue tasks
     */
    @GetMapping("/overdue")
    public ResponseEntity<List<TaskDTO>> getOverdueTasks() {
        log.info("GET /tasks/overdue - Fetching overdue tasks");
        List<TaskDTO> tasks = taskService.getOverdueTasks();
        return ResponseEntity.ok(tasks);
    }
    
    /**
     * Get tasks due today
     */
    @GetMapping("/due-today")
    public ResponseEntity<List<TaskDTO>> getTasksDueToday() {
        log.info("GET /tasks/due-today - Fetching tasks due today");
        List<TaskDTO> tasks = taskService.getTasksDueToday();
        return ResponseEntity.ok(tasks);
    }
    
    /**
     * Search tasks by title
     */
    @GetMapping("/search")
    public ResponseEntity<List<TaskDTO>> searchTasksByTitle(@RequestParam String title) {
        log.info("GET /tasks/search?title={} - Searching tasks by title", title);
        List<TaskDTO> tasks = taskService.searchTasksByTitle(title);
        return ResponseEntity.ok(tasks);
    }
}
