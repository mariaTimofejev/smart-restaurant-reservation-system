package com.example.restaurant.service;

import com.example.restaurant.dto.ReservationRequest;
import com.example.restaurant.model.Reservation;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.repository.ReservationRepository;
import com.example.restaurant.repository.TableRepository;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final TableRepository tableRepository;

    public ReservationService(ReservationRepository reservationRepository,
                              TableRepository tableRepository) {
        this.reservationRepository = reservationRepository;
        this.tableRepository = tableRepository;
    }

    public Reservation createReservation(ReservationRequest request) {

        RestaurantTable table = tableRepository.findById(request.getTableId())
                .orElseThrow(() -> new RuntimeException("Table not found"));

        boolean exists = reservationRepository.existsByTableAndDateAndTime(
                table,
                request.getDate(),
                request.getTime()
        );

        if (exists) {
            throw new RuntimeException("Table already reserved for this time");
        }

        Reservation reservation = new Reservation(
                table,
                request.getDate(),
                request.getTime(),
                request.getCustomerName()
        );

        return reservationRepository.save(reservation);
    }
}