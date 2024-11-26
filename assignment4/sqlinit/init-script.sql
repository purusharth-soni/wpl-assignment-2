CREATE TABLE Users (
    phone_number VARCHAR(20) PRIMARY KEY,
    password VARCHAR(20) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    email VARCHAR(50) NOT NULL
);

CREATE TABLE Flights (
    flight_id VARCHAR(20) PRIMARY KEY,
    origin VARCHAR(20) NOT NULL,
    destination VARCHAR(20) NOT NULL,
    departure_date DATE NOT NULL,
    arrival_date DATE NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    available_seats INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Flight_Bookings (
    booking_id VARCHAR(20) PRIMARY KEY,
    flight_id VARCHAR(20) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Passengers (
    ssn VARCHAR(20) PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    category VARCHAR(20) NOT NULL
);

CREATE TABLE Tickets (
    ticket_id VARCHAR(20) PRIMARY KEY,
    flight_booking_id VARCHAR(20) NOT NULL,
    ssn VARCHAR(20) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Hotels (
    hotel_id VARCHAR(20) PRIMARY KEY,
    hotel_name VARCHAR(20) NOT NULL,
    city VARCHAR(20) NOT NULL,
    price_per_night DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Guests (
    ssn VARCHAR(20) PRIMARY KEY,
    hotel_booking_id VARCHAR(20) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    category VARCHAR(20) NOT NULL
);

CREATE TABLE Hotel_Booking (
    hotel_booking_id VARCHAR(20) PRIMARY KEY,
    hotel_id VARCHAR(20) NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    number_of_rooms INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL
);

INSERT INTO Users (phone_number, password, first_name, last_name, date_of_birth, email, gender)
VALUES ('222-222-2222', 'root', 'Admin', 'Admin', '1990-01-01', 'admin@admin.com', 'undefined');