package com.pharmacymanagement.backend.repository;

import com.pharmacymanagement.backend.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
}
