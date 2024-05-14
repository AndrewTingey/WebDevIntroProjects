<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (isset($_POST['form_type']) && $_POST['form_type'] == "register") {
    $servername = "localhost";
    $serverusername = "root";
    $serverpassword = "";
    $dbname = "WebDevIntroDB";

    // Create connection
    $conn = new mysqli($servername, $serverusername, $serverpassword, $dbname);

    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    } else {
        //WORKING HERE TODO:
        //Store files in the uploads folder
        // Store relative folder path in the database
        //return to the user profile page
    }
}
}
?>