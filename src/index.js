

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "775e9c304f4c99854ae283105fb24c72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature).then(weatherIcon).then(getForecast);
}


let currentLocation = document.querySelector(".location");
currentLocation.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(showPosition);
  city.innerHTML = `...`;
});

let currentTemp = document.querySelector("#temperature");
let city = document.querySelector(".city");
let weather_description = document.querySelector(".weather-description");


function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[date.getDay()];
  return `${day} <br/> ${hours}:${minutes}`;
}


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];

  return days[day];
}


function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temperature}`;
  let userCity = response.data.name;
  city.innerHTML = `${userCity.trim()}`;
  let description = response.data.weather[0].description;
  let day_hour = document.querySelector(".day-hour");
  weather_description.innerHTML = `${
    description[0].toUpperCase() + description.substring(1)
  }`;
  console.log(`This is the response from showTemperature`);
  console.log(response);
  day_hour.innerHTML = formatDate(response.data.dt * 1000);
  celsiusTemperature = response.data.main.temp;
  return response;
}

function weatherIcon(response){
let icon = response.data.weather[0].icon;
let mainIcon=document.getElementsByClassName('clear-sky-day');
mainIcon[0].setAttribute('src',`./assets/${icon}.svg`);
return response;
}


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
  city.innerHTML = `...`;
}


function getForecast(response) {
  console.log(`This is the upcoming API response being sent to getForecast`)
  console.log(response);
  let apiKey = "775e9c304f4c99854ae283105fb24c72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  let outResponse = axios.get(apiUrl).then(displayForecast);
  console.log(`This is the getForecast API response`)
  console.log(outResponse);

}

function displayForecast(response) {
  let forecast = response.data.daily;
console.log(forecast);
  let forecastElement = document.querySelector(".Forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `    <div class="col">
            ${formatDay(forecastDay.dt)}
            ${Math.round(forecastDay.temp.max)}°
            <img class="fivedforecast" src="./assets/${forecastDay.weather[0].icon}.svg"
          </div>`;

    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}


// Search City
function search(event) {
  event.preventDefault();
  let userInput = document.querySelector("#input-box").value;
  let apiKey = "775e9c304f4c99854ae283105fb24c72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}&units=metric`;
  let response = axios.get(apiUrl);
  response.then(response => console.log(response.data.coord));
  response.then(response => getForecast(response.data.coord));
  axios.get(`${apiUrl}`).then(showTemperature);

}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", search);


function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);



function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

}

let celsiusTemperature = null;



let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);