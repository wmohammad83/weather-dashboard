// =================================================================
// API KEY
// =================================================================
var APIKey = "9d71e39dc8732b8512ecb62f316ea833";

// =================================================================
// Town/City
// =================================================================
var city = "rochdale";

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
  // Create CODE HERE to Log the queryURL
  console.log(response);
  // Create CODE HERE to log the resulting object
  // console.log(response);
  // Create CODE HERE to calculate the temperature (converted from Kelvin)
  //   var temp = response.main.temp
  //   var tempC = Math.floor(temp - 273.15)

  //   console.log(tempC);
  // Create CODE HERE to transfer content to HTML
  // Hint: To convert from Kelvin to Celsius: C = K - 273.15
  // Create CODE HERE to dump the temperature content into HTML

  // var dispTemp = $('<h3>')
  // dispTemp.append(tempC + ' degrees celsius')
  // $('.temp').append(dispTemp);

 


  var city = response.city.name;
  var temp = response.list[0].main.temp;
  var date = response.list[0].dt_txt;
  var wind = response.list[0].wind.speed;
  var humidity = response.list[0].main.humidity;


  var div = $("<div>");
  var cardBody = $("<div>");
  div.addClass('card');
  cardBody.addClass('card-body')


  var h1 = $("<h1>");
  var pTemp = $("<p>");
  var pHumidity = $("<p>");
  var pWind = $("<p>");

  h1.text(city);
  pTemp.text('Temp: ' + temp + 'C');
  pHumidity.text('Humidity: ' + humidity + '%');
  pWind.text('Wind Speed: ' + wind + ' Kph');

  cardBody.append(h1);
  cardBody.append(pTemp);
  cardBody.append(pHumidity);
  cardBody.append(pWind);
  div.append(cardBody);
  $("#today").append(div);
});
