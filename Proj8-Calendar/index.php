<?php
  session_start();
  // if the user is already logged in, redirect to the home page
  // if (isset($_SESSION['username'])) {
  //   header('Location: home.php');
  //   exit();
  // }
?>
<!DOCTYPE html>
<html>
<head>
  <title>Login</title>
  <link rel="stylesheet" type="text/css" href="login.css">
</head>
<body>
  <form method="POST" action="process.php">
    <h1>Log in</h1>  
    <!-- LOGIN ONLY -->
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
    <input type="hidden" name="form_type" value="login">
   
    <div class="submit">
      <button id="returnToLogin" type="button" onclick="window.location.href='register.php'">Register</button>
      <input id="submit" type="submit" value="Submit">
    </div>
  </form>
</body>
</html>