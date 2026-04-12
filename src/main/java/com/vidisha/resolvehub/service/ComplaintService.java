package com.vidisha.resolvehub.service;

import com.vidisha.resolvehub.DTo.ComplaintRequest;
import com.vidisha.resolvehub.DTo.ComplaintResponse;
import com.vidisha.resolvehub.Exception.ResourceNotFoundException;
import com.vidisha.resolvehub.model.Complaint;
import com.vidisha.resolvehub.repository.ComplaintRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintRepository repo;
    private final HuggingFaceService huggingFaceService;

    public ComplaintResponse createComplaint(ComplaintRequest request) {

        var aiResponse = huggingFaceService.analyzeComplaint(request.getDescription());

        Complaint complaint = Complaint.builder()
                .description(request.getDescription())
                .category((String) aiResponse.get("category"))
                .priority((String) aiResponse.get("priority"))
                .status("OPEN")
                .createdAt(LocalDateTime.now())
                .build();

        Complaint saved = repo.save(complaint);

        return mapToResponse(saved);
    }

    public List<ComplaintResponse> getAllComplaints() {
        return repo.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ComplaintResponse updateStatus(Long id, String status) {

        Complaint complaint = repo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Complaint not found"));

        complaint.setStatus(status);

        return mapToResponse(repo.save(complaint));
    }

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