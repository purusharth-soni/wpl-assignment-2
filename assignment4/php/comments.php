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
    
    $phone = $data->phone;
    
    // fetch user from database
    $sql = "SELECT * FROM Users WHERE phone_number = '$phone'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode(array([
            "success" => "true",
            "fname" => $row['first_name'],
            "lname" => $row['last_name'],
            "phone" => $row['phone_number'],
            "gender" => $row['gender'],
            "email" => $row['email'],
            "dob" => $row['date_of_birth']
        ]));
    } else {
        echo json_encode(array(['success' => "false"]));
    }

}
?>