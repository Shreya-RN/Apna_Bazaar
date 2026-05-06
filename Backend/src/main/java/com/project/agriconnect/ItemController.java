package com.project.agriconnect;

import java.util.Arrays;
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
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/items")
@CrossOrigin(origins="http://localhost:5173")
public class ItemController {

    @Autowired
    private ItemRepository repo;

    @GetMapping("/latest")
    public List<Item> getLatestItems() {
        return repo.findTop8ByTypeInOrderByIdDesc(
                Arrays.asList("BUY", "RENT")
        );
    }

    @GetMapping("/{type}")
    public List<Item> getByType(@PathVariable String type) {
        return repo.findByType(type.toUpperCase());
    }

    @PostMapping("/add")
    public Item addItem(@RequestBody Item item) {
        return repo.save(item);
    }

   @PostMapping("/sell")
public Item sellItem(
        @RequestParam("image") MultipartFile file,
        @RequestParam("name") String name,
        @RequestParam("model") String model,
        @RequestParam("age") int age,
        @RequestParam("conditionStatus") String conditionStatus,
        @RequestParam("price") double price,
        @RequestParam("location") String location
) {
    String fileName = file.getOriginalFilename();

    try {
        file.transferTo(new java.io.File("uploads/" + fileName));
    } catch (Exception e) {
        e.printStackTrace();
    }

    Item item = new Item();
    item.setName(name);
    item.setModel(model);
    item.setAge(age);
    item.setConditionStatus(conditionStatus);
    item.setPrice(price);
    item.setLocation(location);
    item.setImage(fileName);
    item.setType("SELL");

    return repo.save(item);
}

    @GetMapping("/buy")
public List<Item> getBuyItems(
        @RequestParam(required = false) String sort,
        @RequestParam(required = false) String location
) {

    // 🔹 FILTER by location
    if (location != null) {
        return repo.findByTypeAndLocation("BUY", location);
    }

    // 🔹 SORTING
    if (sort != null) {
        switch (sort) {
            case "low":
                return repo.findByTypeOrderByPriceAsc("BUY");
            case "high":
                return repo.findByTypeOrderByPriceDesc("BUY");
            case "latest":
                return repo.findByTypeOrderByCreatedAtDesc("BUY");
        }
    }

    // default
    return repo.findByType("BUY");
}

    @GetMapping("/detail/{id}")
public Item getItem(@PathVariable Long id) {

    Item item = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Item not found"));

    // mask phone number
    if (item.getOwnerPhone() != null) {
        String phone = item.getOwnerPhone();
        if (phone.length() > 5) {
            item.setOwnerPhone(phone.substring(0, 5) + "*****");
        }
    }

    return item;
}
@GetMapping("/rent")
public List<Item> getRentItems() {
    return repo.findByType("RENT");
}
    
}