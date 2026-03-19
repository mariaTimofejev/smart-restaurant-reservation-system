package com.example.restaurant.dto;

import com.example.restaurant.model.TableFeature;
import com.example.restaurant.model.Zone;

import java.time.LocalDateTime;
import java.util.Set;

public record ReservationRequest(
        Long tableId,
        LocalDateTime dateTime,
        String customerName,
        int peopleCount,
        Set<TableFeature> preferredFeatures,
        Zone preferredZone
) {}