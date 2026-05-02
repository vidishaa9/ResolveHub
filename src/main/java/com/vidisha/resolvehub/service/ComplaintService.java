package com.vidisha.resolvehub.service;

import com.vidisha.resolvehub.dto.ComplaintRequest;
import com.vidisha.resolvehub.dto.ComplaintResponse;
import com.vidisha.resolvehub.Exception.ResourceNotFoundException;
import com.vidisha.resolvehub.model.Complaint;
import com.vidisha.resolvehub.model.User;
import com.vidisha.resolvehub.repository.ComplaintRepository;
import com.vidisha.resolvehub.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Complaint Service with proper user linkage + AI + security support
 */
@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintRepository repo;
    private final UserRepository userRepository;
    private final HuggingFaceService huggingFaceService;

    /**
     * Create complaint (linked to logged-in user)
     */
    public ComplaintResponse createComplaint(ComplaintRequest request, String username) {

        // 🔹 Fetch logged-in user
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String category = "GENERAL";
        String priority = "LOW";

        try {
            var aiResponse = huggingFaceService.analyzeComplaint(request.getDescription());

            if (aiResponse != null) {
                category = (String) aiResponse.getOrDefault("category", "GENERAL");
                priority = (String) aiResponse.getOrDefault("priority", "LOW");
            }

        } catch (Exception e) {
            // 🔹 Fallback if AI fails
            category = "GENERAL";
            priority = "LOW";
        }

        Complaint complaint = Complaint.builder()
                .description(request.getDescription())
                .category(category.toUpperCase())
                .priority(priority.toUpperCase())
                .status("OPEN")
                .createdAt(LocalDateTime.now())
                .user(user) // 🔥 IMPORTANT LINK
                .build();

        Complaint saved = repo.save(complaint);

        return mapToResponse(saved);
    }

    /**
     * USER → Get own complaints (DB-level filtering)
     */
    public List<ComplaintResponse> getUserComplaints(String username) {

        return repo.findByUserUsername(username)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * ADMIN → Get all complaints
     */
    public List<ComplaintResponse> getAllComplaints() {

        return repo.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * ADMIN → Update status
     */
    public ComplaintResponse updateStatus(Long id, String status) {

        Complaint complaint = repo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Complaint not found"));

        complaint.setStatus(status.toUpperCase());

        return mapToResponse(repo.save(complaint));
    }

    /**
     * Mapper
     */
    private ComplaintResponse mapToResponse(Complaint complaint) {
        return ComplaintResponse.builder()
                .id(complaint.getId())
                .description(complaint.getDescription())
                .category(complaint.getCategory())
                .priority(complaint.getPriority())
                .status(complaint.getStatus())
                .createdAt(complaint.getCreatedAt())
                .build();
    }
}