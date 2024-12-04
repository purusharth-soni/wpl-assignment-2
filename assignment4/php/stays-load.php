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
    $hotel_id = $data->id;
    $hotel_name = $data->name;
    $city = $data->city;
    $price = $data->price;

    $sql = "INSERT INTO Hotels VALUES ('$hotel_id', '$hotel_name', '$city', '$price')";
    $conn->query($sql);
}
?>