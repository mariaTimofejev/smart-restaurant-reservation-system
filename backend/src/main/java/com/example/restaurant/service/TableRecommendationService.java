package com.example.restaurant.service;

import com.example.restaurant.dto.ReservationRequest;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.model.TableFeature;
import com.example.restaurant.model.Zone;
import com.example.restaurant.repository.ReservationRepository;
import com.example.restaurant.repository.TableRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TableRecommendationService {

    private final TableRepository tableRepository;
    private final ReservationRepository reservationRepository;

    public TableRecommendationService(
            TableRepository tableRepository,
            ReservationRepository reservationRepository
    ) {
        this.tableRepository = tableRepository;
        this.reservationRepository = reservationRepository;
    }

    public List<RestaurantTable> recommendTables(ReservationRequest request) {

        List<RestaurantTable> tables = tableRepository.findAll();

        LocalDateTime start = request.getDateTime();
        LocalDateTime end = start.plusHours(request.getDuration());

        List<RestaurantTable> availableTables = tables.stream()
                .filter(t -> isAvailable(t.getId(), start, end))
                .toList();

        Map<RestaurantTable, Integer> scores = new HashMap<>();

        for (RestaurantTable table : availableTables) {

            int score = 0;
            
            if (table.getCapacity() >= request.getPeopleCount()) {
                score += 10;
                score += (table.getCapacity() - request.getPeopleCount());
            }

            if (request.getPreferredFeatures() != null) {
                long matches = table.getFeatures().stream()
                        .filter(request.getPreferredFeatures()::contains)
                        .count();
                score += matches * 5;
            }

            if (request.getPreferredZone() != null &&
                    table.getZone() == request.getPreferredZone()) {
                score += 7;
            }

            scores.put(table, score);
        }

        // sort + top 3
        return scores.entrySet().stream()
                .sorted((a, b) -> b.getValue() - a.getValue())
                .limit(3)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }

    //availability check
    private boolean isAvailable(Long tableId, LocalDateTime start, LocalDateTime end) {

        return reservationRepository.findByTableId(tableId)
                .stream()
                .noneMatch(r ->
                        start.isBefore(r.getEndTime()) &&
                        end.isAfter(r.getStartTime())
                );
    }
}