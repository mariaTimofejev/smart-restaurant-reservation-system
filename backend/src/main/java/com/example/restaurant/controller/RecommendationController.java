package com.example.restaurant.controller;

import com.example.restaurant.dto.RecommendationRequest;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.service.RecommendationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recommend")
@CrossOrigin
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @PostMapping
    public List<RestaurantTable> recommend(@RequestBody RecommendationRequest request) {
        return recommendationService.recommendTables(request);
    }
}