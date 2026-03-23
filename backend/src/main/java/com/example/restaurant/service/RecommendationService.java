package com.example.restaurant.service;

import com.example.restaurant.model.Reservation;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.model.TableFeature;
import com.example.restaurant.model.Zone;
import com.example.restaurant.repository.ReservationRepository;
import com.example.restaurant.repository.TableRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Comparator;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;
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

    public RestaurantTable recommend(LocalDate date,
                                     LocalTime time,
                                     int people,
                                     Zone preferredZone,
                                     Set<TableFeature> preferredFeatures) {

        List<Reservation> reservations = reservationRepository.findByDateAndTime(date, time);
        Set<Long> occupied = reservations.stream()
                .map(r -> r.getTable().getId())
                .collect(Collectors.toSet());

        List<RestaurantTable> candidates = tableRepository.findAll().stream()
                .filter(t -> !occupied.contains(t.getId()))
                .filter(t -> t.getCapacity() >= people)
                .toList();

        if (candidates.isEmpty()) return null;

        Set<TableFeature> prefs = preferredFeatures != null
                ? preferredFeatures
                : EnumSet.noneOf(TableFeature.class);

        return candidates.stream()
                .max(Comparator.comparingInt(t -> score(t, people, preferredZone, prefs)))
                .orElse(null);
    }

    private int score(RestaurantTable t,
                      int people,
                      Zone preferredZone,
                      Set<TableFeature> preferredFeatures) {

        int score = 0;

        score -= (t.getCapacity() - people);

        if (preferredZone != null && t.getZone() == preferredZone) {
            score += 5;
        }

        if (t.getFeatures() != null) {
            long matches = t.getFeatures().stream()
                    .filter(preferredFeatures::contains)
                    .count();
            score += matches * 3;
        }

        return score;
    }
}