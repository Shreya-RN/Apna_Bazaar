package com.project.agriconnect;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BazaarRepository extends JpaRepository<BazaarProduct, Long> {

    List<BazaarProduct> findByCategoryIgnoreCase(String category);

}