package com.example.restaurant.config;

import com.example.restaurant.model.Reservation;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.repository.ReservationRepository;
import com.example.restaurant.repository.TableRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Random;

@Component
public class DemoDataLoader implements CommandLineRunner {

    private final ReservationRepository reservationRepository;
    private final TableRepository tableRepository;

    public DemoDataLoader(ReservationRepository reservationRepository,
                          TableRepository tableRepository) {
        this.reservationRepository = reservationRepository;
        this.tableRepository = tableRepository;
    }

    @Override
    public void run(String... args) {
        if (reservationRepository.count() == 0) {
            Random random = new Random();

            for (RestaurantTable table : tableRepository.findAll()) {
                if (random.nextBoolean()) {
                    reservationRepository.save(
                            new Reservation(
                                    table,
                                    LocalDate.now().plusDays(random.nextInt(5)),
                                    LocalTime.of(18 + random.nextInt(3), 0),
                                    "Auto-generated"
                            )
                    );
                }
            }
        }
    }
}