package com.project.agriconnect;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="bazaar_products")
public class BazaarProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;

    private String productName;
    private String category;

    private String quantity;
    private String unit;

    private Double marketMin;
    private Double marketModal;
    private Double marketMax;

    private Double sellerPrice;

    private String location;
    private String contact;

    @Column(length = 1000)
    private String description;

    public BazaarProduct(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id=id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl=imageUrl;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName=productName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category=category;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity=quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit=unit;
    }

    public Double getMarketMin() {
        return marketMin;
    }

    public void setMarketMin(Double marketMin) {
        this.marketMin=marketMin;
    }

    public Double getMarketModal() {
        return marketModal;
    }

    public void setMarketModal(Double marketModal) {
        this.marketModal=marketModal;
    }

    public Double getMarketMax() {
        return marketMax;
    }

    public void setMarketMax(Double marketMax) {
        this.marketMax=marketMax;
    }

    public Double getSellerPrice() {
        return sellerPrice;
    }

    public void setSellerPrice(Double sellerPrice) {
        this.sellerPrice=sellerPrice;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location=location;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact=contact;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description=description;
    }
}