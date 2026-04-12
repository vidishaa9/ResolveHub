package com.vidisha.resolvehub.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * Hugging Face AI Service (FREE)
 */
@Service
@RequiredArgsConstructor
public class HuggingFaceService {

    private final RestTemplate restTemplate;

    private static final Logger logger = LoggerFactory.getLogger(HuggingFaceService.class);

    @Value("${huggingface.api.key}")
    private String apiKey;

    // ✅ FREE model (works without billing)
    private static final String HF_URL =
            "https://api-inference.huggingface.co/models/google/flan-t5-base";

    public Map<String, String> analyzeComplaint(String description) {

        try {
            String prompt = """
                    Classify the complaint into:
                    Category: Billing, Network, Service, Other
                    Priority: Low, Medium, High

                    Return ONLY in this format:
                    category: <value>
                    priority: <value>

                    Complaint: """ + description;

            Map<String, Object> body = Map.of(
                    "inputs", prompt
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            ResponseEntity<Object[]> response = restTemplate.postForEntity(
                    HF_URL,
                    entity,
                    Object[].class
            );

            logger.info("HF Raw Response: {}", (Object) response.getBody());

            // Extract generated text
            Map result = (Map) response.getBody()[0];
            String text = (String) result.get("generated_text");

            logger.info("HF Text: {}", text);

            return parseResponse(text);

        } catch (Exception e) {
            logger.error("HF failed: {}", e.getMessage());

            // ✅ SMART FALLBACK
            return fallbackLogic(description);
        }
    }

    /**
     * Parse AI text response
     */
    private Map<String, String> parseResponse(String text) {

        String category = "Other";
        String priority = "Low";

        text = text.toLowerCase();

        if (text.contains("billing")) category = "Billing";
        else if (text.contains("network")) category = "Network";
        else if (text.contains("service")) category = "Service";

        if (text.contains("high")) priority = "High";
        else if (text.contains("medium")) priority = "Medium";

        return Map.of(
                "category", category,
                "priority", priority
        );
    }

    /**
     * Fallback logic if API fails
     */
    private Map<String, String> fallbackLogic(String description) {

        String desc = description.toLowerCase();

        if (desc.contains("internet") || desc.contains("network")) {
            return Map.of("category", "Network", "priority", "High");
        }
        else if (desc.contains("payment") || desc.contains("bill")) {
            return Map.of("category", "Billing", "priority", "Medium");
        }
        else {
            return Map.of("category", "Other", "priority", "Low");
        }
    }
}