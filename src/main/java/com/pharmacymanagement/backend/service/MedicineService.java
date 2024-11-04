package com.pharmacymanagement.backend.service;

import com.pharmacymanagement.backend.model.Medicine;
import com.pharmacymanagement.backend.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {
     @Autowired
     private MedicineRepository medicineRepository;

     public List<Medicine> getAllMedicines() {
         return medicineRepository.findAll();
     }


}
