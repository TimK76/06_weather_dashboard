var searchButton = document.getElementById("search-form");
    console.log(searchButton);
var searchResult = document.getElementById("city-search");
    
searchButton.addEventListener("click", function(event){
    event.preventDefault();
    getCurrentWeather(searchResult.value);
    getFiveDayForecast(searchResult.value);
})

function getCurrentWeather(cityName) {
    console.log(cityName);
    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=a1ef8fd1923ac811ac579ae278d00a1a&units=imperial"

    fetch(weatherApi)
    .then(function(response) {
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data);
        console.log(data.main.temp);
        console.log(data.wind.speed);
        console.log(data.main.humidity);
        console.log(data.main.uvi);
    })
}

function getFiveDayForecast (cityName) {
    var forecastApi= "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=9bda10a9cce68f06e147ae01a7257580&units=imperial"

    fetch(forecastApi)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
        console.log(data.list[0].dt_txt);
        console.log(data.list[0].weather[0].icon);
        console.log(data.list[0].main.temp);
        console.log(data.list[0].wind);
        console.log(data.list[0].main.humidity);
    })
}