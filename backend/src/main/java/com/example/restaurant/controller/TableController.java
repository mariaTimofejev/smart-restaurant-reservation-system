package com.example.restaurant.controller;

import com.example.restaurant.dto.TableWithStatus;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.repository.ReservationRepository;
import com.example.restaurant.repository.TableRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/tables")
@CrossOrigin(origins = "http://localhost:5173")
public class TableController {

    private final TableRepository tableRepository;
    private final ReservationRepository reservationRepository;

    public TableController(TableRepository tableRepository,
                           ReservationRepository reservationRepository) {
        this.tableRepository = tableRepository;
        this.reservationRepository = reservationRepository;
    }

    @GetMapping("/status")
    public List<TableWithStatus> getTablesWithStatus(
            @RequestParam LocalDate date,
            @RequestParam LocalTime time
    ) {
        return tableRepository.findAll().stream()
                .map(t -> new TableWithStatus(
                        t,
                        reservationRepository.existsByTableAndDateAndTime(t, date, time)
                ))
                .toList();
    }
}