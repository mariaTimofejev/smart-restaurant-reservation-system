package com.example.restaurant.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table; 
import jakarta.persistence.ElementCollection;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import lombok.Data;
import java.util.Set;   

@Entity
@Table(name = "restaurant_table")  
@Data

public class RestaurantTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int capacity;

    @Enumerated(EnumType.STRING)
    private Zone zone;

    private int posX;
    private int posY;

    @ElementCollection(targetClass = TableFeature.class)
    @CollectionTable(
        name = "table_features",
        joinColumns = @JoinColumn(name = "table_id")
    )
    @Column(name = "feature")
    @Enumerated(EnumType.STRING)
    private Set<TableFeature> features;
}