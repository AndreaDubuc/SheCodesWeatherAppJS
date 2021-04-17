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
