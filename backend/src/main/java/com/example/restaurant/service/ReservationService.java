package com.example.restaurant.service;

import com.example.restaurant.dto.ReservationRequest;
import com.example.restaurant.model.Reservation;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.repository.ReservationRepository;
import com.example.restaurant.repository.TableRepository;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class ReservationService {

    private final TableRepository tableRepository;
    private final ReservationRepository reservationRepository;

    public ReservationService(TableRepository tableRepository,
                              ReservationRepository reservationRepository) {
        this.tableRepository = tableRepository;
        this.reservationRepository = reservationRepository;
    }

    public Reservation createReservation(ReservationRequest request) {

        // 1) Leia laud
        RestaurantTable table = tableRepository.findById(request.tableId())
                .orElseThrow(() -> new NoSuchElementException("Table not found with id: " + request.tableId()));

        // 2) Kontrolli, kas inimesed mahuvad
        if (request.peopleCount() > table.getCapacity()) {
            throw new IllegalArgumentException("Table capacity is too small for " + request.peopleCount() + " people");
        }

        // 3) Kontrolli, kas laud on sel ajal juba kinni
        boolean exists = reservationRepository.existsByTableAndDateAndTime(
                table,
                request.date(),
                request.time()
        );

        if (exists) {
            throw new IllegalStateException("Table is already reserved at this time");
        }

        // 4) Loo ja salvesta broneering
        Reservation reservation = new Reservation(
                table,
                request.date(),
                request.time(),
                request.customerName()
        );

        return reservationRepository.save(reservation);
    }
}