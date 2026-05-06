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
@RequestMapping("/workers")
@CrossOrigin(origins = "http://localhost:5173")
public class WorkerController {

    @Autowired
    private WorkerRepository repo;

    // ➕ POST
    @PostMapping
    public Worker addWorker(@RequestBody Worker worker) {
        return repo.save(worker);
    }

    // 📥 GET ALL
    @GetMapping
    public List<Worker> getWorkers() {
        return repo.findAll();
    }

    // 🔍 GET BY ID
    @GetMapping("/{id}")
    public Worker getWorker(@PathVariable Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Worker not found"));
    }
}