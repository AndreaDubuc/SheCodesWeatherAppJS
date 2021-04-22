function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-box");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`.toUpperCase().trim();
  } else {
    alert("Type a city, silly 🤪 ");
  }
}

let searchCity = document.querySelector("#search-form");
console.log(searchCity);
searchCity.addEventListener("submit", search);

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
h2.innerHTML = `${day.toUpperCase()} </br> ${hours}:${minutes}`;

// Added a function to change the temperature from celsius to fahrenheit.
let celsiusUnit = document.querySelector("#celsius-link");

function changeUnitC() {
  let celsiusTemperature = document.querySelector("#temperature");
  celsiusTemperature.innerHTML = `14 `;
}

celsiusUnit.addEventListener("click", changeUnitC);

function changeUnitF() {
  let fahrenheitTemperature = document.querySelector("#temperature");
  fahrenheitTemperature.innerHTML = `57`;
}

let fahrenheitUnit = document.querySelector("#fahrenheit-link");
fahrenheitUnit.addEventListener("click", changeUnitF);

// API

let apiKey = "775e9c304f4c99854ae283105fb24c72";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=New York";
