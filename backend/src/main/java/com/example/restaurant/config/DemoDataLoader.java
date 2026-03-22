package com.example.restaurant.config;

import com.example.restaurant.model.*;
import com.example.restaurant.repository.ReservationRepository;
import com.example.restaurant.repository.RestaurantTableRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Configuration
public class DemoDataLoader {

    @Bean
    CommandLineRunner loadDemoData(RestaurantTableRepository tableRepo,
                                   ReservationRepository reservationRepo) {
        return args -> {

            // Table 1
            RestaurantTable t1 = new RestaurantTable();
            t1.setCapacity(2);
            t1.setZone(Zone.PEASAAL);
            t1.setPosX(1);
            t1.setPosY(1);
            t1.setFeatures(Set.of(TableFeature.QUIET, TableFeature.WINDOW));
            tableRepo.save(t1);

            // Table 2
            RestaurantTable t2 = new RestaurantTable();
            t2.setCapacity(4);
            t2.setZone(Zone.PEASAAL);
            t2.setPosX(2);
            t2.setPosY(1);
            t2.setFeatures(Set.of(TableFeature.NEAR_PLAY_AREA));
            tableRepo.save(t2);

            // Table 3
            RestaurantTable t3 = new RestaurantTable();
            t3.setCapacity(4);
            t3.setZone(Zone.AKNAKOHT);
            t3.setPosX(3);
            t3.setPosY(1);
            t3.setFeatures(Set.of(TableFeature.WINDOW));
            tableRepo.save(t3);

            // Reservations
            reservationRepo.save(new Reservation(
                    t1,
                    LocalDate.of(2026, 3, 22),
                    LocalTime.of(18, 0),
                    "Maria Test"
            ));

            reservationRepo.save(new Reservation(
                    t2,
                    LocalDate.of(2026, 3, 22),
                    LocalTime.of(19, 0),
                    "Mari Maasikas"
            ));
        };
    }
}