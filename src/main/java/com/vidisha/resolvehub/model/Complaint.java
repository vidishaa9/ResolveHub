package com.vidisha.resolvehub.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint {
   //creating a database
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



//   The raw complaint text submitted by the user.
//  @Column(nullable = false) enforces a NOT NULL constraint in the DB.
//  columnDefinition = "TEXT" allows long descriptions (vs VARCHAR limit).

 @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    private String category;//AI-generated
    private String priority;//AI-generated

    private String status;//Open,In-progress,Closed
    private LocalDateTime createdAt;//sorting complaints or tracking history



}
