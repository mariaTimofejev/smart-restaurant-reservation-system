-- Lauad
INSERT INTO restaurant_table (capacity, zone, pos_x, pos_y) VALUES
(2, 'PEASAAL', 1, 1),
(4, 'PEASAAL', 2, 1),
(4, 'AKNAKOHT', 3, 1),
(6, 'PRIVAATRUUM', 1, 2),
(8, 'TERRASS', 2, 2);

-- Laua omadused (features)
INSERT INTO table_features (table_id, feature) VALUES
(1, 'QUIET'),
(1, 'WINDOW'),
(2, 'NEAR_PLAY_AREA'),
(3, 'WINDOW'),
(4, 'PRIVATE'),
(5, 'OUTDOOR');

-- Broneeringud
INSERT INTO reservation (table_id, date, time, customer_name) VALUES
(1, '2026-03-22', '18:00', 'Kaupo Test'),
(2, '2026-03-22', '19:00', 'Mari Maasikas'),
(3, '2026-03-22', '20:00', 'Jaan Juurikas');