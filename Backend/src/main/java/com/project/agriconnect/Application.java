package com.project.agriconnect;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long jobId;

    private String applicantName;
    private String phone;
    private String skills;
    private String experience;
    private String status; // APPLIED / ACCEPTED / REJECTED
    public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}
}
