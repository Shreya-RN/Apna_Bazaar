package com.project.agriconnect;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MarketPriceRepository
        extends JpaRepository<MarketPrice,Long> {

    MarketPrice findByCategory(String category);
}