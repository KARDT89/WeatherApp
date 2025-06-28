import { weatherSearch, IconSearch } from "./weatherAPI.js";

const form = document.getElementById("weather-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = e.target["location"].value;
  const data = await weatherSearch(location);
  showWeather(data)
//   console.log(data);
  
});

function showWeather(data) {
  const currentTemparature = data.currentConditions.temp

  const h1 = document.createElement("h1");
  const content = document.getElementById("content");
  h1.innerHTML = `${currentTemparature}`;
  console.log(h1);

  content.appendChild(h1);
}
