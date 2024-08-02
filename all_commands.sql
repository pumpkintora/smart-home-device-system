CREATE DATABASE IF NOT EXISTS smarthome;

USE smarthome;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50),
    password VARCHAR(255)
);

CREATE TABLE locations (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    location_name VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE devicetypes (
    devicetype_id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(255) NOT NULL
);

CREATE TABLE devices (
    device_id INT AUTO_INCREMENT PRIMARY KEY,
    devicetype_id INT,
    location_id INT,
    schedule_on TIMESTAMP,
    schedule_off TIMESTAMP,
    status ENUM('on', 'off') DEFAULT 'off',
    manual_override BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (devicetype_id) REFERENCES devicetypes(devicetype_id),
    FOREIGN KEY (location_id) REFERENCES locations(location_id)
);

INSERT INTO locations (location_name, user_id) VALUES 
('Living Room', 1),
('Bedroom', 1),
('Kitchen', 2),
('Garage', 3),
('Office', 2);

INSERT INTO devicetypes (type_name) VALUES
('Lamp'),
('Fan'),
('Music System'),
('Air Conditioner'),
('Heater');

INSERT INTO devices (device_name, devicetype_id, location_id) VALUES
('Living Room Lamp', 1, 1),   -- Lamp in Living Room
('Bedroom Fan', 2, 2),        -- Fan in Bedroom
('Kitchen Music System', 3, 3), -- Music System in Kitchen
('Garage Heater', 5, 4),      -- Heater in Garage
('Office Air Conditioner', 4, 5), -- Air Conditioner in Office
('Living Room Music System', 3, 1); -- Music System in Living Room