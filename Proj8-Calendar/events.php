<?php
include 'dbconfig.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    //GET
    //SERVER SIDE RETURNS JSON OBJECT OF HOLIDAYS IN GIVEN MONTH
    //INPUT: MONTH (INT), YEAR (INT)
    //OUTPUT: JSON OBJECT OF HOLIDAYS AND EVENTS IN GIVEN MONTH
    //EXAMPLE: {"holidays":[{"date":"2020-11-11","name":"Veterans Day"},{"date":"2020-11-26","name":"Thanksgiving"}],"events":[{"date":"2020-11-01","name":"Event 1","description":"Description 1"},{"date":"2020-11-15","name":"Event 2","description":"Description 2"}]}

} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //POST
    //SERVER SIDE ADDS HOLIDAY TO DATABASE
    //INPUT: DATE (STRING), NAME (STRING)

    // // getjsonidied data
    // $json = file_get_contents('php://input');
    // $data = json_decode($json, true);
    // $date = $data['date'];
    // $name = $data['name'];

    $date = $_POST['date'];
    $name = $_POST['name'];

    // Create connection
    $conn = new mysqli($servername, $serverusername, $serverpassword, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    echo "Connected successfully <br>";

    $insertQuery = "INSERT INTO events (eventdate, name) VALUES (?, ?)";
    $insertStmt = $conn->prepare($insertQuery);
    $insertStmt->bind_param("ss", $date, $name);

    if ($insertStmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $insertStmt->error;
    }

    $insertStmt->close();
} else {
    echo "Invalid request method";
}


