package com.project.agriconnect;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="market_prices")
public class MarketPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;

    private Double minPrice;
    private Double modalPrice;
    private Double maxPrice;

    private String unit;

    public MarketPrice(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id){
        this.id=id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category){
        this.category=category;
    }

    public Double getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(Double minPrice){
        this.minPrice=minPrice;
    }

    public Double getModalPrice() {
        return modalPrice;
    }

    public void setModalPrice(Double modalPrice){
        this.modalPrice=modalPrice;
    }

    public Double getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(Double maxPrice){
        this.maxPrice=maxPrice;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit){
        this.unit=unit;
    }
}