CREATE TABLE Users (
    phone_number VARCHAR(20) PRIMARY KEY,
    password VARCHAR(20) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    email VARCHAR(50) NOT NULL
);

INSERT INTO Users (phone_number, password, first_name, last_name, date_of_birth, email, gender)
VALUES ('222-222-2222', 'root', 'Admin', 'Admin', '1990-01-01', 'admin@admin.com', 'undefined');