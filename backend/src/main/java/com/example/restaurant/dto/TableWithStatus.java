package com.example.restaurant.dto;

import com.example.restaurant.model.RestaurantTable;

public class TableWithStatus {

    private RestaurantTable table;
    private boolean reserved;

    public TableWithStatus(RestaurantTable table, boolean reserved) {
        this.table = table;
        this.reserved = reserved;
    }

    public RestaurantTable getTable() {
        return table;
    }

    public boolean isReserved() {
        return reserved;
    }
}