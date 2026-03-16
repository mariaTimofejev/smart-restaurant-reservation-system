package com.example.restaurant.service;

import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.model.TableFeature;
import com.example.restaurant.model.Zone;
import com.example.restaurant.repository.TableRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TableRecommendationService {

    private final TableRepository tableRepository;

    public TableRecommendationService(TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }

    public List<RestaurantTable> recommendTables(
            int peopleCount,
            Set<TableFeature> preferredFeatures,
            Zone preferredZone
    ) {
        List<RestaurantTable> tables = tableRepository.findAll();

        Map<RestaurantTable, Integer> scores = new HashMap<>();

        for (RestaurantTable table : tables) {
            int score = 0;

            // 1) Capacity fit
            if (table.getCapacity() >= peopleCount) {
                score += 10; // sobib
                score += (table.getCapacity() - peopleCount); // mida täpsem, seda parem
            }

            // 2) Feature match
            if (preferredFeatures != null) {
                long matches = table.getFeatures().stream()
                        .filter(preferredFeatures::contains)
                        .count();
                score += matches * 5;
            }

            // 3) Zone match
            if (preferredZone != null && table.getZone() == preferredZone) {
                score += 7;
            }

            scores.put(table, score);
        }

        return scores.entrySet().stream()
                .sorted((a, b) -> b.getValue() - a.getValue()) // sort by score desc
                .limit(3)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }
}