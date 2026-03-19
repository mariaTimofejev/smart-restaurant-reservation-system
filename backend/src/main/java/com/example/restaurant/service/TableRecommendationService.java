package com.example.restaurant.service;

import com.example.restaurant.dto.RecommendationRequest;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.model.TableFeature;
import com.example.restaurant.model.Zone;
import com.example.restaurant.repository.ReservationRepository;
import com.example.restaurant.repository.TableRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
public class TableRecommendationService {

    private final TableRepository tableRepository;
    private final ReservationRepository reservationRepository;

    public TableRecommendationService(TableRepository tableRepository,
                                      ReservationRepository reservationRepository) {
        this.tableRepository = tableRepository;
        this.reservationRepository = reservationRepository;
    }

    public List<RestaurantTable> recommendTables(RecommendationRequest request) {

        LocalDateTime dateTime = request.date().atTime(request.time());
        int people = request.peopleCount();
        Set<TableFeature> preferredFeatures = request.preferences();
        Zone preferredZone = request.zone();

        return tableRepository.findAll().stream()
                .filter(t -> t.getCapacity() >= people)
                .filter(t -> preferredZone == null || t.getZone() == preferredZone)
                .filter(t -> preferredFeatures == null || t.getFeatures().containsAll(preferredFeatures))
                .filter(t -> !reservationRepository.existsByTableAndDateAndTime(t, request.date(), request.time()))
                .toList();
    }
}