<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $host = "localhost:3306";
    $user = "root";
    $dbpass = "root";
    $db = "travel";
    $conn = new mysqli($host, $user, $dbpass, $db);

    $data = json_decode(file_get_contents("php://input"), true);
    $city = $data['city'];

    $sql = "SELECT
        A.booking_id,
        A.flight_id,
        B.origin,
        B.destination,
        B.departure_date,
        B.arrival_date,
        B.departure_time,
        B.arrival_time,
        A.total_price
    FROM Flight_Bookings as A
    INNER JOIN Flights as B
    ON A.flight_id = B.flight_id
    WHERE B.destination = '$city'";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $flights = array();
        while ($row = $result->fetch_assoc()) {
            $flight = array(
                'bookingId' => $row['booking_id'],
                'flightId' => $row['flight_id'],
                'origin' => $row['origin'],
                'destination' => $row['destination'],
                'departureDate' => $row['departure_date'],
                'arrivalDate' => $row['arrival_date'],
                'departureTime' => $row['departure_time'],
                'arrivalTime' => $row['arrival_time'],
                'totalPrice' => $row['total_price']
            );
            array_push($flights, $flight);
        }
        echo json_encode($flights);
    } else {
        echo json_encode(array(['success' => "false"]));
    }

}
?>