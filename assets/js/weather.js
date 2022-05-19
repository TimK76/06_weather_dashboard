var searchHistory = [];
var oldSearches = JSON.parse(localStorage.getItem("city:"))
if (oldSearches !== null) {
  searchHistory = oldSearches
}
// console.log(oldSearches);
// ===========Current Weather Variables============
var currentWeatherTemp = document.getElementById("temperature");
var currentWeatherSpeed = document.getElementById("wind");
var currentWeatherHumidity = document.getElementById("humidity");
var currentWeatherUv = document.getElementById("uv-index");
var cityNameEl = document.getElementById('city-name');

// ===========Five Day Forecast Variables============
// =====Day 1 variables ========
var day1 = document.getElementById("day-one");
var day1Date = document.getElementById("day-one-date");
var day1Icon = document.getElementById("day-one-weather-icon");
var day1Temp = document.getElementById("day-one-temp");
var day1Wind = document.getElementById("day-one-wind");
var day1Humidity = document.getElementById("day-one-humidity");

// =====Day 2 variables ========
var day2 = document.getElementById("day-two");
var day2Date = document.getElementById("day-two-date");
var day2Icon = document.getElementById("day-two-weather-icon");
var day2Temp = document.getElementById("day-two-temp");
var day2Wind = document.getElementById("day-two-wind");
var day2Humidity = document.getElementById("day-two-humidity");
// =====Day 3 variables ========
var day3 = document.getElementById("day-three");
var day3Date = document.getElementById("day-three-date");
var day3Icon = document.getElementById("day-three-weather-icon");
var day3Temp = document.getElementById("day-three-temp");
var day3Wind = document.getElementById("day-three-wind");
var day3Humidity = document.getElementById("day-three-humidity");
// =====Day 4 variables ========
var day4 = document.getElementById("day-four");
var day4Date = document.getElementById("day-four-date");
var day4Icon = document.getElementById("day-four-weather-icon");
var day4Temp = document.getElementById("day-four-temp");
var day4Wind = document.getElementById("day-four-wind");
var day4Humidity = document.getElementById("day-four-humidity");
// =====Day 5 variables ========
var day5 = document.getElementById("day-five");
var day5Date = document.getElementById("day-five-date");
var day5Icon = document.getElementById("day-five-weather-icon");
var day5Temp = document.getElementById("day-five-temp");
var day5Wind = document.getElementById("day-five-wind");
var day5Humidity = document.getElementById("day-five-humidity");

// get current date for current weather
$("#date").text(moment().format("dddd, MMMM Do"));

// Function to get the current weather
function getCurrentWeather(cityName) {
  // console.log(cityName);
  var weatherApi =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=a1ef8fd1923ac811ac579ae278d00a1a&units=imperial";

  fetch(weatherApi)
    .then(function (response) {
      if (response.ok) {
        // console.log(response);
        return response.json();
      }
    })
    .then(function (data) {
    //  console.log(data);
      var iconCode = data.weather[0].icon;
      var formatTime = moment.unix(data.dt).format("MM/DD/YYYY");
      cityNameEl.innerHTML = `${data.name} ${formatTime} <img src=http://openweathermap.org/img/w/${iconCode}.png />`;
      currentWeatherTemp.textContent = "Temp: " + data.main.temp + "\u00B0 F";
      currentWeatherSpeed.textContent = "Wind: " + data.wind.speed + " MPH";
      currentWeatherHumidity.textContent = "Humidity: " + data.main.humidity + "%";
      
        // console.log(data);
      // console.log(data.main.temp);
      // console.log(data.wind.speed);
      // console.log(data.main.humidity);
      // console.log(data.main.uvi);
      getFiveDayForecast(data.coord.lat, data.coord.lon);
    });
}

// Function to get the FIVE Day Forecast
function getFiveDayForecast(lattitude, longitude) {
  var forecastApi =
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=a1ef8fd1923ac811ac579ae278d00a1a&units=imperial`

  fetch(forecastApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data)
      
      
      // Get UV index for Current Weather functions above
      var spanEl = document.createElement('span');
      spanEl.textContent = data.current.uvi;
      if (data.current.uvi < 2) {
        spanEl.style.backgroundColor = "green"
      }
      else if (data.current.uvi < 5) {
        spanEl.style.backgroundColor = "yellow"
      }
      else if (data.current.uvi < 7) {
        spanEl.style.backgroundColor = "orange"
      }
      else {
        spanEl.style.backgroundColor = "red"
      }
      currentWeatherUv.innerHTML="UV Index: " 
      currentWeatherUv.appendChild(spanEl);


      
      
      // Get forecast data
      // console.log(data.daily[1].dt);
      // Get forecast data Dates for five days
      day1Date.textContent=moment.unix(data.daily[1].dt).format("MM/DD/YYYY");
      day2Date.textContent=moment.unix(data.daily[2].dt).format("MM/DD/YYYY");
      day3Date.textContent=moment.unix(data.daily[3].dt).format("MM/DD/YYYY");
      day4Date.textContent=moment.unix(data.daily[4].dt).format("MM/DD/YYYY");
      day5Date.textContent=moment.unix(data.daily[5].dt).format("MM/DD/YYYY");
      // Get forecast data icons for five days
      var day1IconCode = data.daily[1].weather[0].icon;
      console.log(day1IconCode)
      // document.getElementById('day-one-weather-icon').src = "http://openweathermap.org/img/wn/"+day1IconCode+"@2x.png";
      day1Icon.src="http://openweathermap.org/img/wn/"+day1IconCode+".png";

      // Get forecast data temp for five days
      day1Temp.textContent="Temp: " + data.daily[1].temp.day + "\u00B0 F";
      day2Temp.textContent="Temp: " + data.daily[2].temp.day + "\u00B0 F";
      day3Temp.textContent="Temp: " + data.daily[3].temp.day + "\u00B0 F";
      day4Temp.textContent="Temp: " + data.daily[4].temp.day + "\u00B0 F";
      day5Temp.textContent="Temp: " + data.daily[5].temp.day + "\u00B0 F";

      // Get forecast data Wind speed for five days
      day1Wind.textContent="Wind: " + data.daily[1].wind_speed + " MPH";
      day2Wind.textContent="Wind: " + data.daily[2].wind_speed + " MPH";
      day3Wind.textContent="Wind: " + data.daily[3].wind_speed + " MPH";
      day4Wind.textContent="Wind: " + data.daily[4].wind_speed + " MPH";
      day5Wind.textContent="Wind: " + data.daily[5].wind_speed + " MPH";

      // Get forecast data Humidity for five days
      day1Humidity.textContent="Humidity: " + data.daily[1].humidity + "%";
      day2Humidity.textContent="Humidity: " + data.daily[2].humidity + "%";
      day3Humidity.textContent="Humidity: " + data.daily[3].humidity + "%";
      day4Humidity.textContent="Humidity: " + data.daily[4].humidity + "%";
      day5Humidity.textContent="Humidity: " + data.daily[5].humidity + "%";
    });
}



// ===========Serch Button Variables & Event Listener============
var searchButton = document.getElementById("search-form");
var searchResult = document.getElementById("city-search");
console.log(searchResult);

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  getCurrentWeather(searchResult.value);
  searchHistory.push(searchResult.value);
  localStorage.setItem("city:", JSON.stringify(searchHistory));
});

var newSearch = () =>  {
  var newSearchButtonEl=document.createElement("button");
  newSearchButtonEl.setAttribute("type", "click");
  newSearchButtonEl.className="col-12 btn-lg btn-secondary mt-2"
  var recentCitiesSearch=document.getElementById("recent-cities")
  var recentCitiesSearchBtn = document.createElement("button");
  recentCitiesSearchBtn.innerHTML = localStorage.getItem("city");

}
