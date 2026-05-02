package com.vidisha.resolvehub.repository;

import com.vidisha.resolvehub.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByStatus(String status);
    List<Complaint> findByCategory(String category);

    // 🔥 ADD THIS LINE (THIS FIXES YOUR ERROR)
    List<Complaint> findByUserUsername(String username);
}
