package com.example.restaurant.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    Long id;
    Long tableId;
    LocalDate date;
    LocalTime startTime;
    LocalTime endTime;
    int peopleCount;
}