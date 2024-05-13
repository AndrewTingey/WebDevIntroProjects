<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $fname = $_POST['first_name'];
    $lname = $_POST['last_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $city = $_POST['city'];
    $zip = $_POST['zip'];
    $state = $_POST['state'];
    $gender = $_POST['gender'];
    $year_in_school = $_POST['year_in_school'];

    if (empty($fname) || empty($lname) || empty($email) || empty($phone) || empty($address) || empty($city) || empty($zip) || empty($state) || empty($gender) || empty($year_in_school)) {
        echo "Error, all fields are required.";
        header("Location: index.php");
        exit();
    }

    echo "First Name: $fname <br>";
    echo "Last Name: $lname <br>";
    echo "Email: $email <br>";
    echo "Phone: $phone <br>";
    echo "Address: $address <br>";
    echo "City: $city <br>";
    echo "Zip: $zip <br>";
    echo "State: $state <br>";
    echo "Gender: $gender <br>";
    echo "Year in School: $year_in_school <br>";
} else {
  echo "Error, not used post method.";
  header("Location: index.php");
}