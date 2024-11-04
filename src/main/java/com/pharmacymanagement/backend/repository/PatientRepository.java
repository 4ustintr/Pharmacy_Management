package com.pharmacymanagement.backend.repository;

import com.pharmacymanagement.backend.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Integer> {
}
