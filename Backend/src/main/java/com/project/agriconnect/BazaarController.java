package com.project.agriconnect;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bazaar/products")
@CrossOrigin(origins = "http://localhost:5173")
public class BazaarController {

    @Autowired
    private BazaarRepository repo;


    // CREATE PRODUCT
    @PostMapping
    public BazaarProduct addProduct(
            @RequestBody BazaarProduct product
    ){
        System.out.println(
           "Received Product: " + product.getProductName()
        );

        return repo.save(product);
    }


    // GET ALL PRODUCTS
    @GetMapping
    public List<BazaarProduct> getAllProducts(){
        return repo.findAll();
    }


    // GET PRODUCT BY ID
    @GetMapping("/{id}")
    public BazaarProduct getProductById(
            @PathVariable Long id
    ){
        return repo.findById(id)
                .orElseThrow();
    }

}