package com.example.restaurant.repository;

import com.example.restaurant.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByTableId(Long tableId);

    @Query("""
        SELECT r FROM Reservation r
        WHERE r.table.id = :tableId
        AND :start < r.endTime
        AND :end > r.startTime
    """)

    List<Reservation> findConflictingReservations(
        @Param("tableId") Long tableId,
        @Param("start") LocalDateTime start,
        @Param("end") LocalDateTime end
    );

    @Query("""
        SELECT CASE WHEN COUNT(r) = 0 THEN true ELSE false END
        FROM Reservation r
        WHERE r.table.id = :tableId
        AND :start < r.endTime
        AND :end > r.startTime
    """)
    boolean isAvailable(
        @Param("tableId") Long tableId,
        @Param("start") LocalDateTime start,
        @Param("end") LocalDateTime end
    );
}