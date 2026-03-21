package com.example.restaurant.service;

import com.example.restaurant.dto.RecommendationRequest;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.model.TableFeature;
import com.example.restaurant.model.Zone;
import com.example.restaurant.repository.ReservationRepository;
import com.example.restaurant.repository.TableRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Service
public class RecommendationService {

    private final TableRepository tableRepository;
    private final ReservationRepository reservationRepository;

    public RecommendationService(TableRepository tableRepository,
                                 ReservationRepository reservationRepository) {
        this.tableRepository = tableRepository;
        this.reservationRepository = reservationRepository;
    }

    public List<RestaurantTable> recommendTables(RecommendationRequest request) {

        LocalDate date = LocalDate.parse(request.getDate());
        LocalTime time = LocalTime.parse(request.getTime());

        int people = request.getPeopleCount();
        List<String> preferredFeatures = request.getPreferences();
        String preferredZone = request.getZone();

        List<RestaurantTable> tables = tableRepository.findAll();
        List<ScoredTable> scored = new ArrayList<>();

        for (RestaurantTable table : tables) {

            boolean reserved = reservationRepository.existsByTableAndDateAndTime(table, date, time);
            if (reserved) continue;

            if (table.getCapacity() < people) continue;

            int score = 0;

            if (preferredZone != null && !preferredZone.isBlank()) {
                if (table.getZone().name().equalsIgnoreCase(preferredZone)) {
                    score += 50;
                }
            }

            if (preferredFeatures != null) {
                for (String feature : preferredFeatures) {
                    try {
                        TableFeature enumFeature = TableFeature.valueOf(feature);
                        if (table.getFeatures().contains(enumFeature)) {
                            score += 10;
                        }
                    } catch (IllegalArgumentException ignored) {
                    }
                }
            }

            if (table.getCapacity() == people) {
                score += 20;
            } else if (table.getCapacity() > people) {
                score += 5;
            }

            scored.add(new ScoredTable(table, score));
        }

        scored.sort((a, b) -> Integer.compare(b.score, a.score));

        return scored.stream()
                .map(s -> s.table)
                .toList();
    }
    private static class ScoredTable {
        RestaurantTable table;
        int score;

        ScoredTable(RestaurantTable table, int score) {
            this.table = table;
            this.score = score;
        }
    }
}