package com.project.agriconnect;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
@CrossOrigin
public class JobController {

    @Autowired
    private JobRepository repo;

    // ✅ Post a job
    @PostMapping("/add")
    public Job addJob(@RequestBody Job job) {
        return repo.save(job);
    }

    // ✅ Get all jobs
    @GetMapping
    public List<Job> getJobs() {
        return repo.findAll();
    }

    // ✅ Get single job
    @GetMapping("/{id}")
    public Job getJob(@PathVariable Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }
}