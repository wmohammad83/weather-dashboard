// =================================================================
// API KEY
// =================================================================
var APIKey = "9d71e39dc8732b8512ecb62f316ea833";

// =================================================================
// Town/City
// =================================================================
var city = "cambridge";

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

  var city = response.city.name;
  var temp = Math.floor(response.list[0].main.temp - 273.15);
  var date = response.list[0].dt_txt;
  date = moment(date).format("DD/MM/YYYY");
  var wind = response.list[0].wind.speed;
  var humidity = response.list[0].main.humidity;
  var icon = response.list[0].weather[0].icon;
  console.log(icon)

  var div = $("<div>");
  var cardBody = $("<div>");
  div.addClass("card");
  cardBody.addClass("card-body");

  var h1 = $("<h1>");
  var pTemp = $("<p>");
  var pHumidity = $("<p>");
  var pWind = $("<p>");
  var mainImg = $("<img>");
  mainImg.attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");

  h1.text(city + " " + date);
  pTemp.text("Temp: " + temp + "C");
  pHumidity.text("Humidity: " + humidity + "%");
  pWind.text("Wind Speed: " + wind + " Kph");

  cardBody.append(h1);
  cardBody.append(mainImg)
  cardBody.append(pTemp);
  cardBody.append(pHumidity);
  cardBody.append(pWind);
  div.append(cardBody);
  $("#today").append(div);

  for (var i = 15; i < response.list.length; i = i + 8) {
    var temp1 = Math.floor(response.list[i].main.temp - 273.15);
    var date1 = response.list[i].dt_txt;
    var wind1 = response.list[i].wind.speed;
    var humidity1 = response.list[i].main.humidity;
    var cardIcon = response.list[i].weather[0].icon;

    var card = $("<div>");
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

    pCardDate.text(moment(date1).format("DD/MM/YYYY"));
    pCardTemp.text("Temp: " + temp1 + "C");
    pCardWind.text("Wind: " + wind1 + " Khr");
    pCardHumidity.text("Humidity: " + humidity1 + "%");

    card.addClass("card");
    smallCardBody.addClass("card-body");

    smallCardBody.append(pCardDate);
    smallCardBody.append(cardImg);
    smallCardBody.append(pCardTemp);
    smallCardBody.append(pCardWind);
    smallCardBody.append(pCardHumidity);

    card.append(smallCardBody);

    $("#forecast").append(card);
  }
});

//     var tempCard = response.list[i].main.temp;
//     var dateCard = response.list[i].dt_txt;
//     var windCard = response.list[i].wind.speed;
//     var humidity = response.list[i].main.humidity;
