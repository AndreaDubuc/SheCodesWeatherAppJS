let now = new Date();
let hours = now.getHours();

// Added a function so that there is a "0" for the minutes if it's under "10".
function minutes_with_leading_zeros(now) {
  return (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
}

let minutes = minutes_with_leading_zeros(now);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let h2 = document.querySelector("h2");
h2.innerHTML = `${day} <br/> ${hours}:${minutes}`;

// API
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
let day_hour = document.querySelector(".day-hour");
let weather_description = document.querySelector(".weather-description");

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temperature}`;
  let userCity = response.data.name;
  city.innerHTML = `${userCity.trim()}`;
  let description = response.data.weather[0].description;
  weather_description.innerHTML = `${description}`;
  //NEED to FIND OUT HOW TO USE TIMEZONE FROM API TO GET TIME IN USER's CITY
}
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
  city.innerHTML = `...`;
} else {
  alert(`Enter a city, silly 🤪`);
}

// Search City
function search(event) {
  event.preventDefault();
  let userInput = document.querySelector("#input-box").value;
  let apiKey = "775e9c304f4c99854ae283105fb24c72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", search);
