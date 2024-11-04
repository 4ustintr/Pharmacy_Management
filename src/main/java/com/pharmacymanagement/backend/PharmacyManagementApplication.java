package com.pharmacymanagement.backend;

import com.pharmacymanagement.backend.repository.MedicineRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class PharmacyManagementApplication {
    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(PharmacyManagementApplication.class, args);
        MedicineRepository medicineRepository = context.getBean(MedicineRepository.class);

    }

}
