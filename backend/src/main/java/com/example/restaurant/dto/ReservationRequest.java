package com.example.restaurant.dto;

import com.example.restaurant.model.TableFeature;
import com.example.restaurant.model.Zone;

import java.time.LocalDateTime;
import java.util.Set;

public class ReservationRequest {

    private int peopleCount;
    private Set<TableFeature> preferences;
    private Zone zone;

    private LocalDateTime dateTime;
    private int duration;
}