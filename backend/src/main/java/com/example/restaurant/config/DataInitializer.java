package com.example.restaurant.config;

import com.example.restaurant.model.Reservation;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.repository.ReservationRepository;
import com.example.restaurant.repository.TableRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Random;

@Component
public class DataInitializer implements CommandLineRunner {

    private final TableRepository tableRepository;
    private final ReservationRepository reservationRepository;

    public DataInitializer(TableRepository tableRepository,
                           ReservationRepository reservationRepository) {
        this.tableRepository = tableRepository;
        this.reservationRepository = reservationRepository;
    }

    @Override
    public void run(String... args) {

        if (reservationRepository.count() > 0) {
            return; 
        }

        List<RestaurantTable> tables = tableRepository.findAll();
        Random random = new Random();

        LocalTime[] times = {
                LocalTime.of(12, 0),
                LocalTime.of(14, 0),
                LocalTime.of(16, 0),
                LocalTime.of(18, 0),
                LocalTime.of(20, 0)
        };

        int reservationCount = 15; 

        for (int i = 0; i < reservationCount; i++) {

            RestaurantTable table = tables.get(random.nextInt(tables.size()));

            LocalDate date = LocalDate.now().plusDays(random.nextInt(4)); // täna + 0..3 päeva
            LocalTime time = times[random.nextInt(times.length)];

            boolean exists = reservationRepository.existsByTableAndDateAndTime(table, date, time);
            if (exists) {
                i--; 
                continue;
            }

            Reservation reservation = new Reservation(
                    table,
                    date,
                    time,
                    "Test Client " + (i + 1)
            );

            reservationRepository.save(reservation);
        }

        System.out.println("Random reservations created: " + reservationCount);
    }
}