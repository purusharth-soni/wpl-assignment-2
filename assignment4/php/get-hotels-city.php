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

    $data = json_decode(file_get_contents("php://input"), true);
    $city = $data['city'];

    $sql = "SELECT * FROM Hotels WHERE city = '$city'";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $hotels = array();
        while ($row = $result->fetch_assoc()) {
            $hotel = array(
                'hotelId' => $row['hotel_id'],
                'name' => $row['hotel_name'],
                'city' => $row['city'],
                'price' => $row['price_per_night'],
            );
            array_push($hotels, $hotel);
        }
        echo json_encode($hotels);
    } else {
        echo json_encode(array(['success' => "false"]));
    }

}
?>