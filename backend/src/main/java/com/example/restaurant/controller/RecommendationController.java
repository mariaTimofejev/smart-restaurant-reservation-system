package com.example.restaurant.controller;

import com.example.restaurant.dto.RecommendationRequest;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.service.RecommendationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
@CrossOrigin(origins = "http://localhost:5173")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @PostMapping("/recommend")
    public List<RestaurantTable> recommend(@RequestBody RecommendationRequest request) {

        // RecommendationService peab kasutama neid samu parameetreid:
        // peopleCount, preferences, zone, date, time

        return recommendationService.recommendTables(
                request.peopleCount(),
                request.preferences(),
                request.zone(),
                request.date(),
                request.time()
        );
    }
}