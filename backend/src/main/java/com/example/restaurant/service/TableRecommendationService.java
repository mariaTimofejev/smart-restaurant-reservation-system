package com.example.restaurant.service;

import com.example.restaurant.dto.RecommendationRequest;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.repository.ReservationRepository;
import com.example.restaurant.repository.TableRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class TableRecommendationService {

    private final TableRepository tableRepository;
    private final ReservationRepository reservationRepository;

    public TableRecommendationService(TableRepository tableRepository,
                                      ReservationRepository reservationRepository) {
        this.tableRepository = tableRepository;
        this.reservationRepository = reservationRepository;
    }

    public List<RestaurantTable> findAvailableTables(RecommendationRequest request) {

        LocalDate date = LocalDate.parse(request.getDate());
        LocalTime time = LocalTime.parse(request.getTime());
        int people = request.getPeopleCount();

        return tableRepository.findAll().stream()
                .filter(t -> t.getCapacity() >= people)
                .filter(t -> !reservationRepository.existsByTableAndDateAndTime(t, date, time))
                .toList();
    }
}