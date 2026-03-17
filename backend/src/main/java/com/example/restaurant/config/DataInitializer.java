package com.example.restaurant.config;

import com.example.restaurant.model.RestaurantTable;
import com.example.restaurant.model.TableFeature;
import com.example.restaurant.model.Zone;
import com.example.restaurant.repository.TableRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataInitializer {

    private final TableRepository tableRepository;

    public DataInitializer(TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }

    @PostConstruct
    public void init() {
        if (tableRepository.count() == 0) {

            tableRepository.save(new RestaurantTable(
                    null,
                    2,
                    Zone.INDOOR,
                    100,
                    100,
                    Set.of(TableFeature.WINDOW)
            ));

            tableRepository.save(new RestaurantTable(
                    null,
                    4,
                    Zone.INDOOR,
                    200,
                    150,
                    Set.of(TableFeature.HIGH_CHAIR)
            ));

            tableRepository.save(new RestaurantTable(
                    null,
                    6,
                    Zone.OUTDOOR,
                    300,
                    200,
                    Set.of(TableFeature.ACCESSIBLE)
            ));

            tableRepository.save(new RestaurantTable(
                    null,
                    2,
                    Zone.OUTDOOR,
                    120,
                    250,
                    Set.of(TableFeature.WINDOW, TableFeature.QUIET)
            ));

            tableRepository.save(new RestaurantTable(
                    null,
                    8,
                    Zone.VIP,
                    400,
                    300,
                    Set.of(TableFeature.QUIET)
            ));

            System.out.println("Demo tables created.");
        }
    }
}