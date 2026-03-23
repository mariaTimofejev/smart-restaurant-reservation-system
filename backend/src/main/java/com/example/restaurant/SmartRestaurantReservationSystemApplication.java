package com.example.restaurant;

import com.example.restaurant.model.Reservation;
import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.repository.ReservationRepository;
import com.example.restaurant.repository.TableRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Random;

@SpringBootApplication
public class SmartRestaurantReservationSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartRestaurantReservationSystemApplication.class, args);
    }

    @Bean
    public CommandLineRunner seedReservations(
            ReservationRepository reservationRepository,
            TableRepository tableRepository
    ) {
        return args -> {
            if (reservationRepository.count() == 0) {
                var random = new Random();

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
        };
    }
}