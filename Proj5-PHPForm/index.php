<!DOCTYPE html>
<html>
<head>
  <title>PHP Form</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
  <form method="POST" action="process.php">
    <div class="question">
      <label class="prompt" for="first_name">First Name:</label>
      <input type="text" name="first_name" id="first_name" required>
    </div>
    <div class="question">
      <label class="prompt" for="last_name">Last Name:</label>
      <input type="text" name="last_name" id="last_name" required>
    </div>
    <div class="question">
      <label class="prompt" for="email">Email:</label>
      <input type="email" name="email" id="email" required>
    </div>
    <div class="question">
      <label class="prompt" for="Phone">Phone:</label>
      <input type="tel" name="phone" id="phone" required>
    </div>
    <div class="question">
      <label class="prompt" for="Address">Address:</label>
      <input type="text" name="address" id="address" required>
    </div>
    <div class="question">
      <label class="prompt" for="City">City:</label>
      <input type="text" name="city" id="city" required>
    </div>
    <div class="question">
      <label class="prompt" for="zip">Zip:</label>
      <input type="text" name="zip" id="zip" required>
    </div>
    <div class="question">
      <label class="prompt" for="State">State:</label>
      <select name="state" id="state" required>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="DC">District Of Columbia</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
      </select>
      <input type="checkbox" name="citizen" id="citizen" value="citizen">
      <label for="citizen">US Citizen?</label>
    </div>
    <div class="question">
      <label class="prompt" for="gender">Gender:</label>
      <input type="radio" name="gender" id="genderM" value="M">
      <label for="genderM">Male</label> </br>
      <input type="radio" name="gender" id="genderF" value="F">
      <label for="genderF">Female</label> 
    </div>
    <div class="question">
      <label class="prompt" for="year_in_school">Year in School:</label>
      <input type="radio" name="year_in_school" id="freshman" value="freshman">
      <label for="freshman">Freshman</label> </br>
      <input type="radio" name="year_in_school" id="sophomore" value="sophomore">
      <label for="sophomore">Sophomore</label> </br>
      <input type="radio" name="year_in_school" id="junior" value="junior">
      <label for="junior">Junior</label> </br>
      <input type="radio" name="year_in_school" id="senior" value="senior">
      <label for="senior">Senior</label> </br>
    </div>
    <br>
    <div class="submit">
      <input id="submit" type="submit" value="Submit">
    </div>
  </form>
</body>
</html>