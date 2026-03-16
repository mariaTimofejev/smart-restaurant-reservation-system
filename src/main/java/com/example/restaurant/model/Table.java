package com.example.restaurant.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;

@Entity
@Data
public class Table {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int capacity;

    @Enumerated(EnumType.STRING)
    private Zone zone;

    private int posX;
    private int posY;

    @ElementCollection(targetClass = TableFeature.class)
    @Enumerated(EnumType.STRING)
    private Set<TableFeature> features;
}