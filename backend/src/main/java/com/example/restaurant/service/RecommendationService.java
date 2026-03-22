package com.example.restaurant.service;

import com.example.restaurant.dto.RecommendationRequest;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.model.TableFeature;
import com.example.restaurant.repository.ReservationRepository;
import com.example.restaurant.repository.TableRepository;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

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

        LocalTime time = request.getTime();

        List<RestaurantTable> allTables = tableRepository.findAll();

        List<RestaurantTable> available = allTables.stream()
                .filter(t -> !reservationRepository.existsByTableAndDateAndTime(
                        t, request.getDate(), time))
                .collect(Collectors.toList());

        Map<RestaurantTable, Integer> scores = new HashMap<>();

        for (RestaurantTable table : available) {
            int score = 0;

            // Capacity match
            if (table.getCapacity() == request.getPartySize()) score += 10;
            else if (table.getCapacity() >= request.getPartySize() + 1 &&
                     table.getCapacity() <= request.getPartySize() + 2) score += 5;
            else if (table.getCapacity() > request.getPartySize() + 2) score -= 5;

            // Preferences
            if (request.getPreferences() != null) {
                if (request.getPreferences().contains("WINDOW") &&
                        table.getFeatures().contains(TableFeature.WINDOW)) score += 10;

                if (request.getPreferences().contains("QUIET") &&
                        table.getFeatures().contains(TableFeature.QUIET)) score += 10;
            }

            // Zone score (ONLY ONCE)
            switch (table.getZone()) {
                case MAIN -> score += 5;
                case TERRACE -> score += 3;
                case PRIVATE -> score += 2;
                case WINDOW -> score += 10;
            }

            scores.put(table, score);
        }

        return available.stream()
                .sorted((a, b) -> scores.get(b) - scores.get(a))
                .collect(Collectors.toList());
    }
}