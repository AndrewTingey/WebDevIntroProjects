<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $isRegister = $_POST['form_type'] === 'register';

    // if (empty($fname) || empty($lname) || empty($email) || empty($phone) || empty($address) || empty($city) || empty($zip) || empty($state) || empty($gender) || empty($year_in_school)) {
    //     echo "Error, all fields are required.";
    //     header("Location: index.php");
    //     exit();
    // }

    echo "Form submitted successfully. <br>";
    
    $servername = "localhost";
    $serverusername = "root";
    $serverpassword = "";
    $dbname = "WebDevIntroDB";
    
    // Create connection
    $conn = new mysqli($servername, $serverusername, $serverpassword, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
    echo "Connected successfully <br>";

    if ($isRegister) {
      $fname = $_POST['first_name'];
      $lname = $_POST['last_name'];
      $birthdate = $_POST['birthdate'];
      $username = $_POST['username'];
      $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

      // Check if username already exists
      $checkUsernameQuery = "SELECT * FROM users WHERE username = ?";
      $checkUsernameStmt = $conn->prepare($checkUsernameQuery);
      $checkUsernameStmt->bind_param("s", $username);
      $checkUsernameStmt->execute();
      $checkUsernameResult = $checkUsernameStmt->get_result();

      if ($checkUsernameResult->num_rows > 0) {
        echo "Username already exists";
        // Redirect to registration page or display an error message
        session_start();
        $_SESSION['error'] = "Username already exists";
        header("Location: register.php");
        exit();
      } else {
        // Insert new user record
        $insertQuery = "INSERT INTO users (first_name, last_name, username, password, birthday, create_time) VALUES (?, ?, ?, ?, ?, NOW())";
        $insertStmt = $conn->prepare($insertQuery);
        $insertStmt->bind_param("sssss", $fname, $lname, $username, $password, $birthdate);

        if ($insertStmt->execute()) {
          echo "New record created successfully";
          // Redirect to login page
          header("Location: index.php");
        } else {
          echo "Error: " . $insertStmt->error;
        }

        $insertStmt->close();
      }

      $checkUsernameStmt->close();
    } else {
      $username = $_POST['username'];
      $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
      $sql = "SELECT * FROM users WHERE username = ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("s", $username);
      if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
          $user = $result->fetch_assoc();
          if (password_verify($_POST['password'], $user['password'])) {
            echo "Login successful";
            echo "<br>";
            echo "Welcome Back, " . $user["first_name"] . " " . $user["last_name"];
            session_start();
            $_SESSION['username'] = $username;
            $_SESSION['birthday'] = $user['birthday'];
            $_SESSION['first_name'] = $user['first_name'];
            $_SESSION['last_name'] = $user['last_name'];
            header("Location: userProfile.php");
          } else {
            session_start();
            $_SESSION['error'] = "Incorrect password";
            header("Location: index.php");
            exit();
          }
        } else {
            echo "User does not exist";
            // redirect to register page or display an error message
        }
      } else {
        echo "Error: " . $stmt->error;
      }
      $stmt->close();
    }

    $conn->close();
} else {
    echo "Error, form not submitted.";
    header("Location: index.php");
    exit();
}
?>