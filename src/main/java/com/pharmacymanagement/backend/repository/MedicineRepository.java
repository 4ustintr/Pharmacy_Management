package com.pharmacymanagement.backend.repository;

import com.pharmacymanagement.backend.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineRepository extends JpaRepository<Medicine, Integer> {
}
