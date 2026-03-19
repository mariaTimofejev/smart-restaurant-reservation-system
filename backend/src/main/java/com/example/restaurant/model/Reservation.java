package com.example.restaurant.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
public class Reservation {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private RestaurantTable table;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
}