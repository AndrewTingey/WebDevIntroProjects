<?php
  session_start();
?>

<!DOCTYPE html>
<html>
<head>
  <title>Register</title>
  <link rel="stylesheet" type="text/css" href="login.css">
</head>
<body>
  <form method="POST" action="process.php">
    <h1>Register</h1>  
      <!-- REGISTER -->
    <div class="question">
      <label class="prompt" for="first_name">First Name:</label>
      <input type="text" name="first_name" id="first_name" required>
    </div>
    <div class="question">
      <label class="prompt" for="last_name">Last Name:</label>
      <input type="text" name="last_name" id="last_name" required>
    </div>
    <div class="question">
      <label class="prompt" for="birthdate">Birthdate:</label>
    <input type="date" name="birthdate" id="birthdate" required>
    </div>
    <div class="question">
      <label class="prompt" for="username">Username:</label>
      <input type="text" name="username" id="username" required>
    </div>
    <div class="question">
      <label class="prompt" for="password">Password:</label>
      <input type="password" name="password" id="password" required>
    </div>
    <div id="errorMessage">
      <?php
        if (isset($_SESSION['error'])) {
          echo $_SESSION['error'];
          // unset the error message after displaying it
          unset($_SESSION['error']);
        }
      ?>
    </div>
    <input type="hidden" name="form_type" value="register">
    <div class="submit">
      <button id="returnToLogin" type="button" onclick="window.location.href='index.php'">Back to Login</button>
      <input id="submit" type="submit" value="Submit">
    </div>
  </form>
</body>
</html>