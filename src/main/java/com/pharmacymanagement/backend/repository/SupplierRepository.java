package com.pharmacymanagement.backend.repository;

import com.pharmacymanagement.backend.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
}
