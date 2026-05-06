package com.project.agriconnect;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findTop8ByTypeInOrderByIdDesc(List<String> types);


    List<Item> findByType(String type);

    List<Item> findByTypeAndLocation(String type, String location);

    List<Item> findByTypeOrderByPriceAsc(String type);

    List<Item> findByTypeOrderByPriceDesc(String type);

    List<Item> findByTypeOrderByCreatedAtDesc(String type);

}