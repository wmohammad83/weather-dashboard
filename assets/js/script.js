// =================================================================
// Cities Array
// =================================================================
var storedCities = JSON.parse(localStorage.getItem("cities"));
var cities = [];

// =================================================================
// Click Function
// =================================================================
$("#search-button").on("click", function (event) {
  // =================================================================
  // Prevent Default
  // =================================================================
  event.preventDefault();

  // =================================================================
  // Get value from input and run the get weather function
  // =================================================================
  var city = $("#search-input").val();

  if (city === "") {
    return;
  }

  getWeather(city);
  cities.push(city);

  // =================================================================
  // Save button data to local storage
  // =================================================================
  localStorage.setItem("cities", JSON.stringify(cities));

  // =================================================================
  // Clear history and re render the buttons onto the html
  // =================================================================
  $("#history").empty();
  renderButtons(cities);

  $("search-input").value = "";
});



// =================================================================
// Render Buttons Array
// =================================================================
function renderButtons(cities) {
  for (city of cities) {
    var button = $("<button>");
    button.text(city);
    button.attr("data-city", city);
    button.addClass("btn btn-secondary my-2");
    $("#history").append(button);
  }
}

// =================================================================
// Click Function to get the buttons working to retrieve data
// =================================================================
function cityHistory(event) {
  var clickedBtn = $(event.target);
  var clickedCity = clickedBtn.attr("data-city");
  getWeather(clickedCity);
}
$("#history").on("click", cityHistory);

// =================================================================
// Get Weather function
// =================================================================
function getWeather(city) {
  $("#today").empty();
  $("#forecast").empty();
  // =================================================================
  // API KEY
  // =================================================================
  var APIKey = "9d71e39dc8732b8512ecb62f316ea833";
  // =================================================================
  // Query URL
  // =================================================================
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey;

  // =================================================================
  // AJAX Call
  // =================================================================
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // =================================================================
    // Get data from API and store it in variables
    // =================================================================
    var city = response.city.name;
    var temp = Math.floor(response.list[0].main.temp - 273.15);
    var date = response.list[0].dt_txt;
    date = moment(date).format("DD/MM/YYYY");
    var wind = response.list[0].wind.speed;
    var humidity = response.list[0].main.humidity;
    var icon = response.list[0].weather[0].icon;

    // =================================================================
    // Create a new div for todays weather and append data
    // =================================================================
    var div = $("<div>");
    var cardBody = $("<div>");
    div.addClass("card");
    cardBody.addClass("card-body mainCard-style");
    var h1 = $("<h1>");
    var pTemp = $("<p>");
    var pHumidity = $("<p>");
    var pWind = $("<p>");
    var mainImg = $("<img>");
    mainImg.attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
    h1.text(city + " " + date);
    pTemp.text("Temp: " + temp + String.fromCharCode(176) + "C");
    pHumidity.text("Humidity: " + humidity + "%");
    pWind.text("Wind: " + wind + " KPH");

    cardBody.append(h1);
    cardBody.append(mainImg);
    cardBody.append(pTemp);
    cardBody.append(pWind);
    cardBody.append(pHumidity);
    div.append(cardBody);
    $("#today").append(div);

    // =================================================================
    // For loop to retrieve data for the next 5 days
    // =================================================================
    for (var i = 7; i < response.list.length; i = i + 8) {
      var temp1 = Math.floor(response.list[i].main.temp - 273.15);
      var date1 = response.list[i].dt_txt;
      var wind1 = response.list[i].wind.speed;
      var humidity1 = response.list[i].main.humidity;
      var cardIcon = response.list[i].weather[0].icon;

      // =================================================================
      // Create a card for each day
      // =================================================================
      var card = $("<div>");
      card.addClass("ml-3");
      var smallCardBody = $("<div>");
      var pCardDate = $("<p>");
      var pCardTemp = $("<p>");
      var pCardWind = $("<p>");
      var pCardHumidity = $("<p>");
      var cardImg = $("<img>");
      cardImg.attr(
        "src",
        "http://openweathermap.org/img/wn/" + cardIcon + "@2x.png"
      );

      // =================================================================
      // Append the data to the html
      // =================================================================
      pCardDate.text(moment(date1).format("DD/MM/YYYY"));
      pCardTemp.text("Temp: " + temp1 + String.fromCharCode(176) + "C");
      pCardWind.text("Wind: " + wind1 + " KPH");
      pCardHumidity.text("Humidity: " + humidity1 + "%");

      card.addClass("card");
      smallCardBody.addClass("card-body card-style");

      smallCardBody.append(pCardDate);
      smallCardBody.append(cardImg);
      smallCardBody.append(pCardTemp);
      smallCardBody.append(pCardWind);
      smallCardBody.append(pCardHumidity);

      card.append(smallCardBody);

      $("#forecast").append(card);
      $("#cards").append("hello ");
    }
  });
}

renderButtons(storedCities)