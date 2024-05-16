<?php
  session_start();
  // if the user is already logged in, redirect to the home page
  if (isset($_SESSION['username'])) {
    $birthday = $_SESSION['birthday'];
    $username = $_SESSION['username'];
    $first_name = $_SESSION['first_name'];
    $last_name = $_SESSION['last_name'];
  } else {
    header('Location: index.php');
    exit();
  }
?>
<!DOCTYPE html>
<html>
<head>
  <title>User Profile</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
  <div id="header">
    <h1>User Profile</h1>
    <h2>Welcome back, <?php echo $first_name . " " . $last_name; ?></h2>
    <div class="question">
      <label class="prompt" for="username">Username:</label>
      <span><?php echo $username; ?></span>
    </div>
    <div class="question">
      <label class="prompt" for="birthdate">Birthdate:</label>
      <span><?php echo $birthday; ?></span>
    </div>
    <div class="submit">
      <button id="logout" type="button" onclick="window.location.href='logout.php'">Logout</button>
    </div>
  </div>
  <br>
  <h2>Upload a picture</h2>
  <form method="POST" action="upload.php" enctype="multipart/form-data">
    <div class="question">
      <label class="prompt" for="fileToUpload">Select image to upload:</label>
      <input type="file" name="fileToUpload" id="fileToUpload" required>
    </div>
    <input type="hidden" name="form_type" value="upload">
    <div class="submit">
      <input id="submit" type="submit" value="Upload">
    </div>
  </form>
  <br>
  <h2>Uploaded Pictures</h2>
  <div class="slideshow-container">
    <?php
    $num_slides = 0;
    $username = $_SESSION['username'];
    $uploads_dir = "uploads/";
    $target_dir = $uploads_dir . $username . "/";
    if (file_exists($target_dir)) {
      $files = array_values(array_diff(scandir($target_dir), array('.', '..')));
      foreach ($files as $i => $file) {
        echo "<!-- Slide $i, $file -->";
        if ($i % 4 == 0) {
          $num_slides++;
          echo "<div class='mySlides fade'>";
          echo "<div class='numbertext'>" . (($i / 4) + 1) . "</div>";
          echo "<div class='gridView'>";
        }
        if ($file != "." && $file != "..") {
          echo "<div class='gridViewItem'>";
          echo "<img src='" . $target_dir . $file . "' width='100%'>";
          echo "</div>";
        }
        if ($i % 4 == 3 || $i == count($files) - 1){
          echo "</div>";
          echo "</div>";
        }
      }
    }
    ?>
  <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  <a class="next" onclick="plusSlides(1)">&#10095;</a>
  </div>
  <br>

  <div style="text-align:center">
    <?php
    for ($i = 0; $i < $num_slides; $i++) {
      echo "<span class='dot' onclick='currentSlide(" . $i . ")'></span>";
    }
    ?>
  </div>
  
</body>
<script src="scripts.js"></script>
</html>