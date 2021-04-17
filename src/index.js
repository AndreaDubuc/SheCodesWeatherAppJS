function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-box");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    alert("Type a city, silly 🤪 ");
  }
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", search);

let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
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
h2.innerHTML = `${day}|${hours}:${minutes}`;