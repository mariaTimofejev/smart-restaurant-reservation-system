package com.example.restaurant.controller;

import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.repository.TableRepository;
import java.time.LocalDate;
import java.time.LocalTime;
import com.example.restaurant.dto.TableWithStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
public class TableController {

    private final TableRepository tableRepository;

    public TableController(TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }

    @GetMapping
    public List<RestaurantTable> getAllTables() {
        return tableRepository.findAll();
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