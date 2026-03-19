package com.example.restaurant.service;

import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.model.TableFeature;
import com.example.restaurant.model.Zone;
import com.example.restaurant.repository.TableRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@Service
public class RecommendationService {

    private final TableRepository tableRepository;

    public RecommendationService(TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }

    public List<RestaurantTable> recommendTables(
            int peopleCount,
            Set<TableFeature> preferences,
            Zone zone,
            LocalDate date,
            LocalTime time
    ) {
        return tableRepository.findAll().stream()
                .filter(t -> t.getCapacity() >= peopleCount)
                .filter(t -> zone == null || t.getZone() == zone)
                .filter(t -> preferences == null || t.getFeatures().containsAll(preferences))
                .toList();
    }
}