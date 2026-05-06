package com.project.agriconnect;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String listingType;
    private String imageUrl;
    private String itemCondition;
    private String nameModel;
    private String age;
    private String price;
    private String location;
    private String contact;

    @Column(length = 1000)
    private String description;

    private Boolean verified = true;
    private Double rating = 4.4;
    private String demand = "Medium";

    private Double latitude;
    private Double longitude;

    // ✅ VERY IMPORTANT (else null issue)
    public Equipment() {}

    // ✅ GETTERS & SETTERS (REQUIRED for JSON mapping)

    public Long getId() { return id; }

    public String getListingType() { return listingType; }
    public void setListingType(String listingType) { this.listingType = listingType; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getItemCondition() { return itemCondition; }
    public void setItemCondition(String itemCondition) { this.itemCondition = itemCondition; }

    public String getNameModel() { return nameModel; }
    public void setNameModel(String nameModel) { this.nameModel = nameModel; }

    public String getAge() { return age; }
    public void setAge(String age) { this.age = age; }

    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getVerified() { return verified; }
    public void setVerified(Boolean verified) { this.verified = verified; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public String getDemand() { return demand; }
    public void setDemand(String demand) { this.demand = demand; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
}