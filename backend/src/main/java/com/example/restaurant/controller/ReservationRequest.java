package com.example.restaurant.dto;

import com.example.restaurant.model.TableFeature;
import com.example.restaurant.model.Zone;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

public record ReservationRequest(
        Long tableId,
        LocalDate date,
        LocalTime time,
        String customerName
) {}