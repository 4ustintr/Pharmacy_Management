package com.pharmacymanagement.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int medicineId;
    private String medicineName;
    private int quantity;
    private Date expDate;
    private Date entryDate;
    private int supplierId;
    private String medicineType;

    public Medicine() {
    }

    public Medicine(String medicineName, int quantity, Date expDate, Date entryDate, int supplierId, String medicineType) {
        this.medicineName = medicineName;
        this.quantity = quantity;
        this.expDate = expDate;
        this.entryDate = entryDate;
        this.supplierId = supplierId;
        this.medicineType = medicineType;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Date getExpDate() {
        return expDate;
    }

    public void setExpDate(Date expDate) {
        this.expDate = expDate;
    }

    public Date getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(Date entryDate) {
        this.entryDate = entryDate;
    }

    public int getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(int supplierId) {
        this.supplierId = supplierId;
    }

    public String getMedicineType() {
        return medicineType;
    }

    public void setMedicineType(String medicineType) {
        this.medicineType = medicineType;
    }

    @Override
    public String toString() {
        return "Medicine{" +
                "medicineId=" + medicineId +
                ", medicineName='" + medicineName + '\'' +
                ", quantity=" + quantity +
                ", expDate=" + expDate +
                ", entryDate=" + entryDate +
                ", supplierId=" + supplierId +
                ", medicineType='" + medicineType + '\'' +
                '}';
    }
}
