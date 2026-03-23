package com.example.restaurant.controller;

import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.model.TableFeature;
import com.example.restaurant.model.Zone;
import com.example.restaurant.service.RecommendationService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/recommend")
@CrossOrigin(origins = "*")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping
    public RestaurantTable recommend(
            @RequestParam LocalDate date,
            @RequestParam LocalTime time,
            @RequestParam int people,
            @RequestParam(required = false) Zone zone,
            @RequestParam(required = false) List<TableFeature> features
    ) {
        Set<TableFeature> featureSet = features != null
                ? EnumSet.copyOf(features)
                : EnumSet.noneOf(TableFeature.class);

        return recommendationService.recommend(
                date,
                time,
                people,
                zone,
                featureSet
        );
    }
}