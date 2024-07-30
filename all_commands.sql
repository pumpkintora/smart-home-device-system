CREATE DATABASE smarthome;

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
    device_name VARCHAR(255) NOT NULL,
    devicetype_id INT,
    location_id INT,
    FOREIGN KEY (devicetype_id) REFERENCES devicetypes(devicetype_id),
    FOREIGN KEY (location_id) REFERENCES locations(location_id)
);

INSERT INTO table_name (column_one, column_two, column_three) VALUES (1,1,1), (2,2,2), (3,3,3);