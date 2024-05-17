<?php
  session_start();
  // if the user is not already logged in, redirect to the login page
  if (!isset($_SESSION['username'])) {
    header('Location: index.php');
    exit();
  }
?>
<!DOCTYPE html>
<html>

<head>
    <title>Calendar</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
</head>

<body>
    <div id="addEventOverlay">
        <div id="addEventForm">
            <div id="addEventHeader">
                <span>Add Event</span><span id="eventDate">2024-5-15</span>
                <button id="closeAddEvent" onclick="closeAddEvent()">X</button>
            </div>
            <div id="addEventBody">
                <input type="text" id="eventTitle" placeholder="Event Title">
                <input type="text" id="eventTime" placeholder="Event Time">
                <button id="addEventButton" onclick="addEvent()">Add Event</button>
            </div>
        </div>
    </div>


    <div id="calendar">
        <div id="user_header">
            <span><?php echo $_SESSION['first_name'] . " " . $_SESSION['last_name']; ?></span>
            <button id="logout" onclick="window.location.href='logout.php'">Logout</button>
        </div>
        <div id="calendar_header">
            <button id="prev_month">
                &#10094; Prev
            </button>
            <div id="month_year">
                <span id="month_name">January 2022</span>
            </div>
            <button id="next_month">
                Next &#10095;
            </button>
        </div>
        <div id="calendar_weekdays">
            <div class="weekday">Sunday</div>
            <div class="weekday">Monday</div>
            <div class="weekday">Tuesday</div>
            <div class="weekday">Wednesday</div>
            <div class="weekday">Thursday</div>
            <div class="weekday">Friday</div>
            <div class="weekday">Saturday</div>
        </div>
        <div id="month_container">
            <div class="day"><span class="date">1</span></div>
            <div class="day"><span class="date">2</span></div>
            <div class="day"><span class="date">3</span></div>
            <div class="day"><span class="date">4</span></div>
            <div class="day"><span class="date">5</span></div>
            <div class="day"><span class="date">6</span></div>
            <div class="day"><span class="date">7</span></div>
            <div class="day"><span class="date">8</span></div>
            <div class="day"><span class="date">9</span></div>
        </div>
        <div id="dates">
        </div>
    </div>
</body>
<script src="script.js"></script>

</html>