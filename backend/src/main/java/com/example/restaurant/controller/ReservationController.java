package com.example.restaurant.controller;

import com.example.restaurant.dto.ReservationRequest;
import com.example.restaurant.model.Reservation;
import com.example.restaurant.repository.TableRepository;
import com.example.restaurant.service.ReservationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "*")
public class ReservationController {

    private final ReservationService reservationService;
    private final TableRepository tableRepository;

    public ReservationController(ReservationService reservationService,
                                 TableRepository tableRepository) {
        this.reservationService = reservationService;
        this.tableRepository = tableRepository;
    }

    @PostMapping
    public Reservation createReservation(@RequestBody ReservationRequest request) {
        return reservationService.createReservation(request);
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }
}