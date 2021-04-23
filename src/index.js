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
h2.innerHTML = `${day.toUpperCase()} <br/> ${hours}:${minutes}`;

// API

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "775e9c304f4c99854ae283105fb24c72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  axios.get(`${apiUrl}`).then(showTemperature);
}

let currentTemp = document.querySelector("#temperature");
let city = document.querySelector(".city");
let day_hour = document.querySelector(".day-hour");
let weather_description = document.querySelector(".weather-description");

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temperature}`;
  let userCity = response.data.name;
  city.innerHTML = `${userCity.toUpperCase().trim()}`;
  let description = response.data.weather[0].description;
  console.log(description.toUpperCase());
  weather_description.innerHTML = `${description.toUpperCase()}`;
  //FIND OUT HOW TO USE TIMEZONE FROM API TO GET TIME IN USER CITY
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
