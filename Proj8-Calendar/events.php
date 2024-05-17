<?php
include 'dbconfig.php';
session_start();
if (!isset($_SESSION['username'])) {
    header('Location: index.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    //GET
    //SERVER SIDE RETURNS JSON OBJECT OF HOLIDAYS IN GIVEN MONTH
    //INPUT: MONTH (INT), YEAR (INT)
    //OUTPUT: JSON OBJECT OF HOLIDAYS AND EVENTS IN GIVEN MONTH
    /*EXAMPLE: {
            '2024-05-01': [{ 'time': '12:00', 'event': 'Meeting with Bob', 'type': 'userEvent' }],
            '2024-05-02': [{ 'time': '10:00', 'event': 'Meeting with Alice', 'type': 'holiday' }],
            '2024-05-24': [{ 'time': '10:00', 'event': 'Birthday', 'type': 'birthday' }],
        }
    */
    
    if (!isset($_GET['month'], $_GET['year'])) {
        echo "Invalid request";
        exit();
    }
    $month = $_GET['month'];
    $year = $_GET['year'];
    $username = $_SESSION['username'];

    // Create connection
    $conn = new mysqli($servername, $serverusername, $serverpassword, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    // echo "Connected successfully <br>";

    //get user id
    $getUserIDQuery = "SELECT userid FROM users WHERE username = ?";
    $getUserIDStmt = $conn->prepare($getUserIDQuery);
    $getUserIDStmt->bind_param("s", $username);
    $getUserIDStmt->execute();
    $getUserIDResult = $getUserIDStmt->get_result();
    $userid = $getUserIDResult->fetch_assoc()['userid'];

    //get events
    $getEventsQuery = "SELECT eventdate, name, time FROM events WHERE userid = ? AND MONTH(eventdate) = ? AND YEAR(eventdate) = ?";
    $getEventsStmt = $conn->prepare($getEventsQuery);
    $getEventsStmt->bind_param("iii", $userid, $month, $year);
    $getEventsStmt->execute();
    $eventsResult = $getEventsStmt->get_result();
    $events = array();
    while ($row = $eventsResult->fetch_assoc()) {
        $row['type'] = "userEvent";
        $events[] = $row;
    }

    //add US holidays
    $holidays = array(
        array("date" => "$year-01-01", "name" => "New Year's Day"),
        array("date" => "$year-01-20", "name" => "Martin Luther King Jr. Day"),
        array("date" => "$year-02-14", "name" => "Valentine's Day"),
        array("date" => "$year-02-17", "name" => "Presidents' Day"),
        array("date" => "$year-03-17", "name" => "St. Patrick's Day"),
        array("date" => "$year-04-01", "name" => "April Fool's Day"),
        array("date" => "$year-04-10", "name" => "Good Friday"),
        array("date" => "$year-05-10", "name" => "Mother's Day"),
        array("date" => "$year-05-25", "name" => "Memorial Day"),
        array("date" => "$year-06-21", "name" => "Father's Day"),
        array("date" => "$year-07-04", "name" => "Independence Day"),
        array("date" => "$year-09-07", "name" => "Labor Day"),
        array("date" => "$year-10-12", "name" => "Columbus Day"),
        array("date" => "$year-10-31", "name" => "Halloween"),
        array("date" => "$year-11-11", "name" => "Veterans Day"),
        array("date" => "$year-11-26", "name" => "Thanksgiving Day"),
        array("date" => "$year-12-25", "name" => "Christmas Day"),
        array("date" => "$year-12-31", "name" => "New Year's Eve")
    );

    foreach ($holidays as $holiday) {
        $events[] = array("eventdate" => $holiday['date'], "name" => $holiday['name'], "time" => "", "type" => 'holiday');
    }
    //get user birthday
    $getUserBirthdayQuery = "SELECT first_name, last_name, birthday FROM users WHERE userid = ?";
    $getUserBirthdayStmt = $conn->prepare($getUserBirthdayQuery);
    $getUserBirthdayStmt->bind_param("i", $userid);
    $getUserBirthdayStmt->execute();
    $getUserBirthdayResult = $getUserBirthdayStmt->get_result();
    $birthdayData = $getUserBirthdayResult->fetch_assoc();
    $first_name = $birthdayData['first_name'];
    $last_name = $birthdayData['last_name'];
    $birthday = $birthdayData['birthday'];
    $age = date_diff(date_create($birthday), date_create('now'))->y;
    $this_year_birthday = date("Y") . "-" . date("m-d", strtotime($birthday));

    $events[] = array("eventdate" => $this_year_birthday, "name" => "$first_name $last_name's $age Birthday", "time" => "", "type" => "birthday");

    echo json_encode($events);

    $getEventsStmt->close();
    $getUserIDStmt->close();
    $conn->close();
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //POST
    //SERVER SIDE ADDS HOLIDAY TO DATABASE
    //INPUT: DATE (STRING), NAME (STRING)

    if (!isset($_POST['eventTitle'], $_POST['eventDate'], $_POST['eventTime'])) {
        echo "Invalid request";
        exit();
    } 
    $name = $_POST['eventTitle'];
    $eventdate = $_POST['eventDate'];
    $time = $_POST['eventTime'];
    $username = $_SESSION['username'];

    // Create connection
    $conn = new mysqli($servername, $serverusername, $serverpassword, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    echo "Connected successfully <br>";

    //get user id
    $getUserIDQuery = "SELECT userid FROM users WHERE username = ?";
    $getUserIDStmt = $conn->prepare($getUserIDQuery);
    $getUserIDStmt->bind_param("s", $username);
    $getUserIDStmt->execute();
    $getUserIDResult = $getUserIDStmt->get_result();
    $userid = $getUserIDResult->fetch_assoc()['userid'];

    $insertQuery = "INSERT INTO events (eventdate, name, time, userid) VALUES (?, ?, ?, ?)";
    $insertStmt = $conn->prepare($insertQuery);
    $insertStmt->bind_param("sssi", $eventdate, $name, $time, $userid);

    if ($insertStmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $insertStmt->error;
    }

    $insertStmt->close();
} else {
    echo "Invalid request method";
}


