package com.vidisha.resolvehub.controller;

import com.vidisha.resolvehub.dto.ComplaintRequest;
import com.vidisha.resolvehub.dto.ComplaintResponse;
import com.vidisha.resolvehub.service.ComplaintService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.security.Principal;
import java.util.List;

/**
 * REST Controller for Complaint APIs
 * Role-based access using JWT
 */
@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
public class ComplaintController {

    private final ComplaintService service;

    /**
     * USER + ADMIN → Create complaint
     */
    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ComplaintResponse create(
            @Valid @RequestBody ComplaintRequest request,
            Principal principal) {

        return service.createComplaint(request, principal.getName());
    }

    /**
     * USER + ADMIN → View their own complaints
     */
    @GetMapping("/my")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public List<ComplaintResponse> getMyComplaints(Principal principal) {
        return service.getUserComplaints(principal.getName());
    }

    /**
     * ADMIN → View all complaints
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<ComplaintResponse> getAll() {
        return service.getAllComplaints();
    }

    /**
     * ADMIN → Update complaint status
     */
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ComplaintResponse updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return service.updateStatus(id, status);
    }
}