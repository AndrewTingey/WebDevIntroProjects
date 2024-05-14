<?php
  session_start();
  // if the user is already logged in, redirect to the home page
  if (isset($_SESSION['username'])) {
    $birthday = $_SESSION['birthday'];
    $username = $_SESSION['username'];
    $first_name = $_SESSION['first_name'];
    $last_name = $_SESSION['last_name'];
  }
?>
<!DOCTYPE html>
<html>
<head>
  <title>Login</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
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
    <button id="logout" type="button" onclick="window.location.href='index.php'">Logout</button>
  </div>
  
</body>
</html>