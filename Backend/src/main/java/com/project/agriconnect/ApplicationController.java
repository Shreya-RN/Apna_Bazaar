package com.project.agriconnect;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
@CrossOrigin
public class ApplicationController {

    @Autowired
    private ApplicationRepository repo;

    // ✅ Apply for job
    @PostMapping("/apply")
    public Application apply(@RequestBody Application app) {
        app.setStatus("APPLIED");
        return repo.save(app);
    }

    // ✅ Get applicants for a job
    @GetMapping("/job/{jobId}")
    public List<Application> getApplicants(@PathVariable Long jobId) {
        return repo.findByJobId(jobId);
    }
}