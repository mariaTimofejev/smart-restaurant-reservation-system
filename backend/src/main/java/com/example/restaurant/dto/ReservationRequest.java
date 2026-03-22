package com.example.restaurant.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record ReservationRequest(
        Long tableId,
        LocalDate date,
        LocalTime time,
        String customerName
) {}