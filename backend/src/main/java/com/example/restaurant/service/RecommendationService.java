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

        LocalDate date = request.date();
        LocalTime time = request.time();
        int people = request.peopleCount();
        Set<TableFeature> preferredFeatures = request.preferences();
        Zone preferredZone = request.zone();

        List<RestaurantTable> tables = tableRepository.findAll();

        List<ScoredTable> scored = new ArrayList<>();

        for (RestaurantTable table : tables) {

            boolean reserved = reservationRepository.existsByTableAndDateAndTime(table, date, time);
            if (reserved) continue;

            if (table.getCapacity() < people) continue;

            // 2.3) Arvuta skoor
            int score = 0;

            // +50 kui tsoon sobib
            if (preferredZone != null && table.getZone() == preferredZone) {
                score += 50;
            }

            // +10 iga sobiva funktsiooni eest
            if (preferredFeatures != null) {
                for (TableFeature feature : preferredFeatures) {
                    if (table.getFeatures().contains(feature)) {
                        score += 10;
                    }
                }
            }

            // +20 kui laud on täpselt sobiva suurusega
            if (table.getCapacity() == people) {
                score += 20;
            }

            // +5 kui laud on natuke suurem
            if (table.getCapacity() > people) {
                score += 5;
            }

            scored.add(new ScoredTable(table, score));
        }

        // 3) Sorteeri skoori järgi
        scored.sort((a, b) -> Integer.compare(b.score, a.score));

        // 4) Tagasta ainult lauad
        return scored.stream()
                .map(s -> s.table)
                .toList();
    }

    // Sisemine klass skoori hoidmiseks
    private static class ScoredTable {
        RestaurantTable table;
        int score;

        ScoredTable(RestaurantTable table, int score) {
            this.table = table;
            this.score = score;
        }
    }
}