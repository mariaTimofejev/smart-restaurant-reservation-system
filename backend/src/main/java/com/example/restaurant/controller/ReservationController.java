package com.example.restaurant.controller;

import com.example.restaurant.model.Reservation;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.repository.ReservationRepository;
import com.example.restaurant.repository.TableRepository;
import com.example.restaurant.controller.ReservationRequest;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;

@RestController
@RequestMapping("/reservations")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservationController {

    private final ReservationRepository reservationRepository;
    private final TableRepository tableRepository;

    public ReservationController(ReservationRepository reservationRepository, TableRepository tableRepository) {
        this.reservationRepository = reservationRepository;
        this.tableRepository = tableRepository;
    }

    @PostMapping
    public Reservation createReservation(@RequestBody ReservationRequest request) {

        RestaurantTable table = tableRepository.findById(request.tableId())
                .orElseThrow(() -> new RuntimeException("Table not found"));

        boolean taken = reservationRepository.existsByTableAndDateAndTime(
                table,
                request.date(),
                request.time()
        );

        if (taken) {
            throw new RuntimeException("Table already reserved at this time");
        }

        Reservation reservation = new Reservation(
                table,
                request.date(),
                request.time(),
                request.customerName()
        );

        return reservationRepository.save(reservation);
    }
}