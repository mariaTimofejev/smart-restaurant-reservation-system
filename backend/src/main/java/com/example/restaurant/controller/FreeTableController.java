package com.example.restaurant.controller;

import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.repository.ReservationRepository;
import com.example.restaurant.repository.TableRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/free-tables")
@CrossOrigin(origins = "*")
public class FreeTableController {

    private final TableRepository tableRepository;
    private final ReservationRepository reservationRepository;

    public FreeTableController(TableRepository tableRepository,
                               ReservationRepository reservationRepository) {
        this.tableRepository = tableRepository;
        this.reservationRepository = reservationRepository;
    }

    @GetMapping
    public List<RestaurantTable> getFreeTables(
            @RequestParam LocalDate date,
            @RequestParam LocalTime time
    ) {
        Set<Long> occupied = reservationRepository.findByDateAndTime(date, time)
                .stream()
                .map(r -> r.getTable().getId())
                .collect(Collectors.toSet());

        return tableRepository.findAll().stream()
                .filter(t -> !occupied.contains(t.getId()))
                .toList();
    }
}