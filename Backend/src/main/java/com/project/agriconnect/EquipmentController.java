package com.project.agriconnect;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/equipment")
@CrossOrigin(origins = "http://localhost:5173") // frontend port
public class EquipmentController {

    @Autowired
    private EquipmentRepository repo;

    // ✅ CREATE
    @PostMapping
    public Equipment add(@RequestBody Equipment eq) {
        System.out.println("Received: " + eq.getNameModel()); // debug
        return repo.save(eq);
    }

    // ✅ READ (FILTER BY TYPE)
    @GetMapping
    public List<Equipment> getAll(@RequestParam(required = false) String type) {

        if (type != null && !type.isEmpty()) {
           return repo.findByListingTypeIgnoreCase(type);
        }

        return repo.findAll();
    }

    // ✅ READ BY ID
    @GetMapping("/{id}")
    public Equipment getById(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }
}