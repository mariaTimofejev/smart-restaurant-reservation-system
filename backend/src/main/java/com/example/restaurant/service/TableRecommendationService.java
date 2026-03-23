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
public class TableRecommendationService {

    private final TableRepository tableRepository;
    private final ReservationRepository reservationRepository;

    public TableRecommendationService(TableRepository tableRepository,
                                      ReservationRepository reservationRepository) {
        this.tableRepository = tableRepository;
        this.reservationRepository = reservationRepository;
    }

    public RestaurantTable recommendTable(LocalDate date,
                                          LocalTime time,
                                          int peopleCount,
                                          Zone preferredZone,
                                          Set<TableFeature> preferredFeatures) {

        // hõivatud lauad antud kuupäeval ja kellaajal
        List<Reservation> reservations = reservationRepository.findByDateAndTime(date, time);
        Set<Long> occupiedTableIds = reservations.stream()
                .map(r -> r.getTable().getId())
                .collect(Collectors.toSet());

        // vabad lauad, mis mahutavad piisavalt inimesi
        List<RestaurantTable> candidates = tableRepository.findAll().stream()
                .filter(t -> !occupiedTableIds.contains(t.getId()))
                .filter(t -> t.getCapacity() >= peopleCount)
                .toList();

        if (candidates.isEmpty()) {
            return null;
        }

        // kui eelistusi pole antud, kasuta tühja komplekti
        Set<TableFeature> prefs = preferredFeatures != null
                ? preferredFeatures
                : EnumSet.noneOf(TableFeature.class);

        return candidates.stream()
                .max(Comparator.comparingInt(t -> scoreTable(t, peopleCount, preferredZone, prefs)))
                .orElse(null);
    }

    private int scoreTable(RestaurantTable table,
                           int peopleCount,
                           Zone preferredZone,
                           Set<TableFeature> preferredFeatures) {

        int score = 0;

        // 1) efektiivsus – vähem tühje kohti on parem
        int extraSeats = table.getCapacity() - peopleCount;
        score -= extraSeats; // nt 2 üleliigset kohta = -2

        // 2) tsooni eelistus
        if (preferredZone != null && table.getZone() == preferredZone) {
            score += 5;
        }

        // 3) feature’ite eelistused
        if (table.getFeatures() != null) {
            long matches = table.getFeatures().stream()
                    .filter(preferredFeatures::contains)
                    .count();
            score += matches * 3; // iga sobiv feature +3
        }

        return score;
    }
}