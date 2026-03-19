package com.example.restaurant.controller;

import com.example.restaurant.dto.RecommendationRequest;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.service.RecommendationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    private final ReservationRepository reservationRepository;

    public ReservationController(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    @PostMapping("/book")
    public Reservation bookTable(@RequestBody Reservation reservation) {
        // lihtne valideerimine: kas laud on vaba
        boolean isFree = reservationRepository.findByTableIdAndDateAndStartTimeBeforeAndEndTimeAfter(
                reservation.getTableId(),
                reservation.getDate(),
                reservation.getEndTime(),
                reservation.getStartTime()
        ).isEmpty();

        if (!isFree) {
            throw new RuntimeException("Table is already reserved in this time slot");
        }

        return reservationRepository.save(reservation);
    }
}