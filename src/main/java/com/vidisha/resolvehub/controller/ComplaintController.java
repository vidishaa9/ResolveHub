package com.vidisha.resolvehub.controller;

import com.vidisha.resolvehub.DTo.ComplaintRequest;
import com.vidisha.resolvehub.DTo.ComplaintResponse;
import com.vidisha.resolvehub.service.ComplaintService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller
 */
@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

    private final ComplaintService service;

    /**
     * Create complaint
     */
    @PostMapping
    public ComplaintResponse create(@RequestBody ComplaintRequest request) {
        return service.createComplaint(request);
    }

    /**
     * Get all complaints
     */
    @GetMapping
    public List<ComplaintResponse> getAll() {
        return service.getAllComplaints();
    }

    /**
     * Update status
     */
    @PutMapping("/{id}/status")
    public ComplaintResponse updateStatus(@PathVariable Long id,
                                          @RequestParam String status) {
        return service.updateStatus(id, status);
    }
}