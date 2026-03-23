package com.example.restaurant.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.FetchType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "restaurant_table")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class RestaurantTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int capacity;

    @Enumerated(EnumType.STRING)
    private Zone zone;

    @Column(name = "pos_x")
    private int posX;

    @Column(name = "pos_y")
    private int posY;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "table_features",
            joinColumns = @JoinColumn(name = "table_id")
    )
    @Column(name = "feature")
    @Enumerated(EnumType.STRING)
    private Set<TableFeature> features;
}