function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "775e9c304f4c99854ae283105fb24c72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);
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
  day_hour.innerHTML = formatDate(response.data.dt * 1000);
  celsiusTemperature = response.data.main.temp;


}



if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
  city.innerHTML = `...`;
}




function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "775e9c304f4c99854ae283105fb24c72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  let response = axios.get(apiUrl).then(displayForecast);
  console.log(response);

}

function displayForecast(response){
  console.log(response);
  let forecastElement=document.querySelector(".Forecast");
  let days=[`Sat`,`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`];
  days.forEach(function(day){
    
  })
  let forecastHTML=`<div class="row`;
  forecastHTML =
  forecastHTML +
  ` <div class="row">
          <div class="col">
            Sat
            <br />
            11°
            <br />
            <i id="sat" class="fas fa-cloud-rain"></i>
          </div>`




 

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


  //getForecast(data.coord);

}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", search);


function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  //remove the active class from the celsius link
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