import { weatherSearch, IconSearch } from "./weatherAPI.js";

const form = document.getElementById("weather-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = e.target["location"].value;
  const weatherData = await weatherSearch(location);
  const iconData = await IconSearch(weatherData.iconName);
  showWeather(weatherData, iconData);
});

function showWeather(weatherData, iconData) {
  const { currentTemperature, iconName, description } = weatherData;
  const { imgURL } = iconData;
  const h1 = document.createElement("h1");
  const h2 = document.createElement("h2");
  const content = document.getElementById("content");
  const vibe = document.getElementById("vibe");
  const img = document.createElement("img");
  const card = document.createElement("div");
  const weatherIcon = document.createElement("img");

  content.innerHTML = "";
  vibe.innerHTML = ""

  h1.classList.add('current-temperature')
  h2.classList.add('weather-description')
  img.classList.add('weather-gif')
  weatherIcon.classList.add('weather-icon')
  card.classList.add('card')


  h1.innerHTML = `${currentTemperature}`;
  h2.innerHTML = `${description}`;
  img.src = imgURL;
  weatherIcon.src = `/icons/${iconName}.svg`;


  card.appendChild(h1);
  card.appendChild(weatherIcon);
  card.appendChild(h2);

  content.appendChild(card)
  vibe.appendChild(img);
}
