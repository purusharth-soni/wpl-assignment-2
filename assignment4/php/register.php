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
    $pass = $data->password;
    $fname = $data->firstName;
    $lname = $data->lastName;
    $dob = $data->dob;
    $email = $data->email;
    $gender = $data->gender;

    $sql = "INSERT INTO USERS (phone_number, password, first_name, last_name, date_of_birth, email, gender) VALUES ('$phone', '$pass', '$fname', '$lname', '$dob', '$email', '$gender')";

    if ($conn->query($sql) === TRUE) {
        echo "success";
    } else {
        echo "fail";
    }
}
?>