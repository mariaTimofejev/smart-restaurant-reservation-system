package com.example.restaurant.config;

import com.example.restaurant.model.*;
import com.example.restaurant.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RestaurantTableRepository tableRepository;
    private final ReservationRepository reservationRepository;

    public DataInitializer(RestaurantTableRepository tableRepository,
                           ReservationRepository reservationRepository) {
        this.tableRepository = tableRepository;
        this.reservationRepository = reservationRepository;
    }

    @Override
    public void run(String... args) {

        if (tableRepository.count() == 0) {
            createTables();
        }

        if (reservationRepository.count() == 0) {
            createReservations();
        }
    }

    private void createTables() {
        Random random = new Random();

        for (int i = 1; i <= 20; i++) {
            RestaurantTable table = new RestaurantTable();
            table.setCapacity(2 + random.nextInt(5)); // 2–6 inimest
            table.setZone(randomZone());
            table.setPosX(random.nextInt(500));
            table.setPosY(random.nextInt(500));
            table.setFeatures(randomFeatures());

            tableRepository.save(table);
        }

        System.out.println("Created 20 demo tables.");
    }

    private void createReservations() {
        Random random = new Random();
        List<RestaurantTable> tables = tableRepository.findAll();

        for (int i = 0; i < 10; i++) {
            Reservation reservation = new Reservation();
            RestaurantTable table = tables.get(random.nextInt(tables.size()));

            reservation.setTableId(table.getId());
            reservation.setDate(LocalDate.now().plusDays(random.nextInt(7))); // järgmise 7 päeva jooksul
            reservation.setStartTime(LocalTime.of(12 + random.nextInt(8), 0)); // 12:00–20:00
            reservation.setEndTime(reservation.getStartTime().plusHours(2));
            reservation.setPeopleCount(1 + random.nextInt(table.getCapacity()));

            reservationRepository.save(reservation);
        }

        System.out.println("Created 10 demo reservations.");
    }

    private Zone randomZone() {
        Zone[] zones = Zone.values();
        return zones[new Random().nextInt(zones.length)];
    }

    private Set<TableFeature> randomFeatures() {
        TableFeature[] features = TableFeature.values();
        Random random = new Random();

        Set<TableFeature> set = new HashSet<>();
        int count = random.nextInt(features.length + 1);

        for (int i = 0; i < count; i++) {
            set.add(features[random.nextInt(features.length)]);
        }

        return set;
    }
}