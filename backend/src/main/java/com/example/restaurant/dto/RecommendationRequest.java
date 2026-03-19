package com.example.restaurant.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import com.example.restaurant.model.TableFeature;
import com.example.restaurant.model.Zone;
import java.util.Set;

public record RecommendationRequest(
        int peopleCount,
        Set<TableFeature> preferences,
        Zone zone,
        LocalDate date,
        LocalTime time
) {}