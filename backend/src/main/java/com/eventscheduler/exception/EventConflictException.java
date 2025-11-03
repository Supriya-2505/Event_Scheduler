package com.eventscheduler.exception;

import java.util.Collections;
import java.util.List;

public class EventConflictException extends RuntimeException {

    private final List<String> suggestions;

    public EventConflictException(String message) {
        super(message);
        this.suggestions = Collections.emptyList();
    }

    public EventConflictException(String message, Throwable cause) {
        super(message, cause);
        this.suggestions = Collections.emptyList();
    }

    public EventConflictException(String message, List<String> suggestions) {
        super(message);
        this.suggestions = suggestions == null ? Collections.emptyList() : suggestions;
    }

    public EventConflictException(String message, List<String> suggestions, Throwable cause) {
        super(message, cause);
        this.suggestions = suggestions == null ? Collections.emptyList() : suggestions;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }
}
