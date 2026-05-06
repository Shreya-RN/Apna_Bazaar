package com.project.agriconnect;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/market-prices")
@CrossOrigin(origins="http://localhost:5173")
public class MarketPriceController {

    @Autowired
    private MarketPriceRepository repo;

    @GetMapping
    public List<MarketPrice> getAll(){
        return repo.findAll();
    }

    @GetMapping("/{category}")
    public MarketPrice byCategory(
            @PathVariable String category){
        return repo.findByCategory(category);
    }
}