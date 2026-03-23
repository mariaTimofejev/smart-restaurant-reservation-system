package com.example.restaurant.controller;

import com.example.restaurant.repository.ReservationRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/free-times")
@CrossOrigin(origins = "*")
public class FreeTimeController {

    private final ReservationRepository reservationRepository;

    public FreeTimeController(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    @GetMapping
    public List<LocalTime> getFreeTimes(
            @RequestParam LocalDate date
    ) {
        List<LocalTime> allTimes = List.of(
                LocalTime.of(16, 0),
                LocalTime.of(17, 0),
                LocalTime.of(18, 0),
                LocalTime.of(19, 0),
                LocalTime.of(20, 0)
        );

        List<LocalTime> free = new ArrayList<>();

        for (LocalTime time : allTimes) {
            boolean anyFree = reservationRepository.findByDateAndTime(date, time).isEmpty();
            if (anyFree) free.add(time);
        }

        return free;
    }
}