package com.example.restaurant.controller;

import com.example.restaurant.dto.ReservationRequest;
import com.example.restaurant.model.Reservation;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.repository.ReservationRepository;
import com.example.restaurant.repository.RestaurantTableRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservationController {

    private final ReservationRepository reservationRepository;
    private final RestaurantTableRepository tableRepository;

    public ReservationController(ReservationRepository reservationRepository,
                                 RestaurantTableRepository tableRepository) {
        this.reservationRepository = reservationRepository;
        this.tableRepository = tableRepository;
    }

    @GetMapping
    public List<Reservation> getAll() {
        return reservationRepository.findAll();
    }

    @PostMapping
    public Reservation create(@RequestBody ReservationRequest request) {

        RestaurantTable table = tableRepository.findById(request.tableId())
                .orElseThrow(() -> new RuntimeException("Table not found"));

        Reservation reservation = new Reservation(
                table,
                request.date(),
                request.time(),
                request.customerName()
        );

        return reservationRepository.save(reservation);
    }
}