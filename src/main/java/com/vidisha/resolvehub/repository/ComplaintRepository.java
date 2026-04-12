package com.vidisha.resolvehub.repository;


import com.vidisha.resolvehub.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long > {

    List<Complaint> findByStatus(String Status); //automatically creates queries
    List<Complaint> findByCategory(String Category);



}
