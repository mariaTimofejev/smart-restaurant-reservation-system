package com.example.restaurant.dto;

import com.example.restaurant.model.RestaurantTable;

public record TableWithStatus(
        RestaurantTable table,
        boolean reserved
) {}