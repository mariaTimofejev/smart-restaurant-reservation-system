package com.example.restaurant.repository;

import com.example.restaurant.model.Reservation;
import com.example.restaurant.model.RestaurantTable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByDateAndTime(LocalDate date, LocalTime time);

    boolean existsByTableAndDateAndTime(RestaurantTable table, LocalDate date, LocalTime time);
}