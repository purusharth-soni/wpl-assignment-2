<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $host = "localhost:3306";
    $user = "root";
    $dbpass = "root";
    $db = "travel";
    $conn = new mysqli($host, $user, $dbpass, $db);

    $data = json_decode(file_get_contents("php://input"));
    
    $flight_id = $data->id;
    $origin = $data->origin;
    $destination = $data->destination;
    $departure_date = $data->departureDate;
    $arrival_date = $data->arrivalDate;
    $departure_time = $data->departureTime;
    $arrival_time = $data->arrivalTime;
    $available_seats = $data->availableSeats;
    $price = $data->price;

    $sql = "INSERT INTO FLIGHTS VALUES ('$flight_id', '$origin', '$destination', '$departure_date', '$arrival_date', '$departure_time', '$arrival_time', '$available_seats', '$price')";
    $conn->query($sql);
}
?>