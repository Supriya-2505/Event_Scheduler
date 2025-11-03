package com.eventscheduler.service;

import com.eventscheduler.dto.TaskDTO;
import com.eventscheduler.entity.Task;
import com.eventscheduler.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TaskService {
    
    private final TaskRepository taskRepository;
    
    /**
     * Get all tasks
     */
    @Transactional(readOnly = true)
    public List<TaskDTO> getAllTasks() {
        log.info("Fetching all tasks");
        return taskRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get task by ID
     */
    @Transactional(readOnly = true)
    public TaskDTO getTaskById(Long id) {
        log.info("Fetching task with ID: {}", id);
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        return convertToDTO(task);
    }
    
    /**
     * Create new task
     */
    public TaskDTO createTask(TaskDTO taskDTO) {
        log.info("Creating new task: {}", taskDTO.getTitle());
        Task task = convertToEntity(taskDTO);
        if (task.getCompleted() != null && task.getCompleted()) {
            task.setCompletionDate(LocalDate.now());
        }
        Task savedTask = taskRepository.save(task);
        return convertToDTO(savedTask);
    }
    
    /**
     * Update existing task
     */
    public TaskDTO updateTask(Long id, TaskDTO taskDTO) {
        log.info("Updating task with ID: {}", id);
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        
        // Update fields
        existingTask.setTitle(taskDTO.getTitle());
        existingTask.setDescription(taskDTO.getDescription());
        existingTask.setDueDate(taskDTO.getDueDate());
        existingTask.setPriority(taskDTO.getPriority());
        existingTask.setAssignee(taskDTO.getAssignee());
        boolean wasCompleted = existingTask.getCompleted();
        existingTask.setCompleted(taskDTO.getCompleted());
        
        // Update completion date when task is marked as completed
        if (!wasCompleted && taskDTO.getCompleted()) {
            existingTask.setCompletionDate(LocalDate.now());
        } else if (!taskDTO.getCompleted()) {
            existingTask.setCompletionDate(null);
        }
        
        Task updatedTask = taskRepository.save(existingTask);
        return convertToDTO(updatedTask);
    }
    
    /**
     * Delete task
     */
    public void deleteTask(Long id) {
        log.info("Deleting task with ID: {}", id);
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
    }
    
    /**
     * Toggle task completion status
     */
    public TaskDTO toggleTaskCompletion(Long id) {
        log.info("Toggling completion status for task with ID: {}", id);
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        
        boolean newCompletionStatus = !task.getCompleted();
        task.setCompleted(newCompletionStatus);
        
        // Update completion date based on new status
        if (newCompletionStatus) {
            task.setCompletionDate(LocalDate.now());
        } else {
            task.setCompletionDate(null);
        }
        
        Task updatedTask = taskRepository.save(task);
        return convertToDTO(updatedTask);
    }
    
    /**
     * Get tasks by completion status
     */
    @Transactional(readOnly = true)
    public List<TaskDTO> getTasksByCompletionStatus(Boolean completed) {
        log.info("Fetching tasks with completion status: {}", completed);
        return taskRepository.findByCompleted(completed).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get tasks by priority
     */
    @Transactional(readOnly = true)
    public List<TaskDTO> getTasksByPriority(Task.TaskPriority priority) {
        log.info("Fetching tasks with priority: {}", priority);
        return taskRepository.findByPriority(priority).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get tasks by event
     */
    @Transactional(readOnly = true)
    public List<TaskDTO> getTasksByEvent(Long eventId) {
        log.info("Fetching tasks for event with ID: {}", eventId);
        return taskRepository.findByEventId(eventId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get overdue tasks
     */
    @Transactional(readOnly = true)
    public List<TaskDTO> getOverdueTasks() {
        log.info("Fetching overdue tasks");
        return taskRepository.findOverdueTasks(LocalDate.now()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get tasks due today
     */
    @Transactional(readOnly = true)
    public List<TaskDTO> getTasksDueToday() {
        log.info("Fetching tasks due today");
        return taskRepository.findTasksDueToday(LocalDate.now()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Search tasks by title
     */
    @Transactional(readOnly = true)
    public List<TaskDTO> searchTasksByTitle(String title) {
        log.info("Searching tasks by title: {}", title);
        return taskRepository.findByTitleContainingIgnoreCase(title).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Convert Entity to DTO
     */
    private TaskDTO convertToDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setDueDate(task.getDueDate());
        dto.setPriority(task.getPriority());
        dto.setAssignee(task.getAssignee());
        dto.setCompleted(task.getCompleted());
        dto.setEventId(task.getEvent() != null ? task.getEvent().getId() : null);
        dto.setEventTitle(task.getEvent() != null ? task.getEvent().getTitle() : null);
        dto.setCreatedAt(task.getCreatedAt());
        dto.setUpdatedAt(task.getUpdatedAt());
        return dto;
    }
    
    /**
     * Convert DTO to Entity
     */
    private Task convertToEntity(TaskDTO dto) {
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setDueDate(dto.getDueDate());
        task.setPriority(dto.getPriority() != null ? dto.getPriority() : Task.TaskPriority.MEDIUM);
        task.setAssignee(dto.getAssignee());
        task.setCompleted(dto.getCompleted() != null ? dto.getCompleted() : false);
        return task;
    }
}

// Add this method to TaskRepository.java if it's missing
/**
 * Count pending tasks (not completed)
 */