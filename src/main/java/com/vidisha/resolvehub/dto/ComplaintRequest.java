package com.vidisha.resolvehub.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ComplaintRequest {

    @NotBlank(message = "Description cannot be empty")
    private String description;
}