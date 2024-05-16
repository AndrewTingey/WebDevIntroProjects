<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (isset($_POST['form_type']) && $_POST['form_type'] == "upload") { 
    $username = $_SESSION['username'];
    echo "Uploading user: " . $username . "<br>";
    $uploads_dir = "uploads/";
    $target_dir = $uploads_dir . $username . "/";
    if (!file_exists($uploads_dir)) {
      mkdir($uploads_dir, 0777, true);
    }
    if (!file_exists($target_dir)) {
      mkdir($target_dir, 0755);
    }
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    
    //check if actual image
    if(isset($_POST["submit"])) {
      $check = getimagesize($_FILES ["fileToUpload"]["tmp_name"]);
      if($check !== false) {
          echo "File is an image - " . $check["mime"] . ".";
          $uploadOk = 1;
      } else {
          echo "File is not an image.";
          $uploadOk = 0;
      }
    }

    //check if file already exists
    if (file_exists($target_file)) {
      echo "Sorry, file already exists.";
      $uploadOk = 0;
    }

    //check file size
    if ($_FILES["fileToUpload"]["size"] > 500000) {
      echo "Sorry, your file is too large.";
      $uploadOk = 0;
    }

    //allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
      echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
      $uploadOk = 0;
    }

    //check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
      echo "Sorry, your file was not uploaded.";
    } else {
      if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". htmlspecialchars(basename($_FILES["fileToUpload"]["name"])). " has been uploaded. <br>";
        echo "Return to <a href='userProfile.php'>User Profile</a>";
      } else {
        echo "Sorry, there was an error uploading your file.";
      }
    }



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
} else {
  echo "Invalid request 1";
  exit();
}
} else {
  echo "Invalid request 2";
  exit();
}
?>