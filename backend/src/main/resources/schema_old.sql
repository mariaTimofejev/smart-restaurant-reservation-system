DROP TABLE IF EXISTS table_features;
DROP TABLE IF EXISTS reservation;
DROP TABLE IF EXISTS restaurant_table;

CREATE TABLE restaurant_table (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    capacity INT NOT NULL,
    zone VARCHAR(255) NOT NULL,
    pos_x INT NOT NULL,
    pos_y INT NOT NULL
);

CREATE TABLE reservation (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    table_id BIGINT,
    date DATE NOT NULL,
    time TIME NOT NULL,
    customer_name VARCHAR(255) NOT NULL,

    CONSTRAINT fk_reservation_table
        FOREIGN KEY (table_id)
        REFERENCES restaurant_table(id)
        ON DELETE SET NULL
);

CREATE TABLE table_features (
    table_id BIGINT NOT NULL,
    feature VARCHAR(255) NOT NULL,

    CONSTRAINT fk_table_features_table
        FOREIGN KEY (table_id)
        REFERENCES restaurant_table(id)
        ON DELETE CASCADE
);