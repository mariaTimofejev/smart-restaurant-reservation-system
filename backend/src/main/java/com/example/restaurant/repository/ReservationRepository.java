package com.example.restaurant.repository;

import com.example.restaurant.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("""
        SELECT CASE WHEN COUNT(r) = 0 THEN true ELSE false END
        FROM Reservation r
        WHERE r.table.id = :tableId
        AND :start < r.endTime
        AND :end > r.startTime
    """)
    boolean isAvailable(Long tableId, LocalDateTime start, LocalDateTime end);
}