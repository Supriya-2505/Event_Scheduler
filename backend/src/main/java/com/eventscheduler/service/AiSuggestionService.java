package com.eventscheduler.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class AiSuggestionService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${OPENAI_API_KEY:}")
    private String openaiApiKey;

    public List<String> suggestAlternatives(String location, LocalDate date, LocalTime time) {
        if (openaiApiKey == null || openaiApiKey.isBlank()) {
            log.warn("OpenAI API key not configured; skipping suggestions");
            return List.of();
        }

        try {
            String url = "https://api.openai.com/v1/chat/completions";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(openaiApiKey);

            String prompt = String.format(
                "A hotel booking is already taken at %s on %s at %s. Suggest up to 5 similar available hotels nearby (name, short address or neighborhood, and 1-line reason why it's a good alternative). Return each suggestion as a single line.",
                location, date.toString(), time.toString()
            );

            // Build request JSON for ChatCompletion (gpt-3.5/ or other model)
            String requestJson = objectMapper.createObjectNode()
                .put("model", "gpt-3.5-turbo")
                .set("messages", objectMapper.createArrayNode()
                    .add(objectMapper.createObjectNode()
                        .put("role", "system")
                        .put("content", "You are a helpful assistant that suggests nearby hotels succinctly."))
                    .add(objectMapper.createObjectNode()
                        .put("role", "user")
                        .put("content", prompt)))
                .toString();

            HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

            String resp = restTemplate.postForObject(url, entity, String.class);
            JsonNode root = objectMapper.readTree(resp);
            JsonNode choices = root.path("choices");
            if (choices.isArray() && choices.size() > 0) {
                String text = choices.get(0).path("message").path("content").asText();
                return parseSuggestionsFromText(text);
            }
        } catch (Exception e) {
            log.error("Failed to get AI suggestions", e);
        }

        return List.of();
    }

    private List<String> parseSuggestionsFromText(String text) {
        List<String> results = new ArrayList<>();
        String[] lines = text.split("\r?\n");
        for (String line : lines) {
            line = line.trim();
            if (line.isEmpty()) continue;
            // remove leading numbering like '1.' or '- '
            line = line.replaceAll("^\\s*\\d+\\.\\s*", "");
            line = line.replaceAll("^[-*\\s]+", "");
            results.add(line);
            if (results.size() >= 5) break;
        }
        return results;
    }
}
