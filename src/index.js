function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-box");
  let h1 = document.querySelector("h1");
  if (searchInput) {
  }
  h1.innerHTML = `${searchInput.value}`;
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", search);
