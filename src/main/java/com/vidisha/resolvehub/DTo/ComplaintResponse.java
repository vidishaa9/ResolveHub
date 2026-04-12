package com.vidisha.resolvehub.DTo;


import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder //used to create objects step-by-step instead of using long constructors
public class ComplaintResponse {
    private Long id;
    private String description;
    private String category;
    private String priority;
    private String status;
    private LocalDateTime createdAt ;


}
