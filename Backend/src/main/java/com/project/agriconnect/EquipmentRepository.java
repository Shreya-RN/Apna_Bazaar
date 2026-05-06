package com.project.agriconnect;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

    List<Equipment> findByListingTypeIgnoreCase(String listingType);
}