import { weatherSearch, BackgroundSearch } from "./weatherAPI.js";

const form = document.getElementById("weather-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = e.target["location"].value;
  const forecastArray = await weatherSearch(location);
  //   const iconData = await IconSearch(weatherData.iconName);
  showWeather(forecastArray);
  console.log(forecastArray);
});

async function showWeather(forecastArray) {
  const content = document.getElementById("content");
  content.innerHTML = "";

  const { imgURL } = await BackgroundSearch(forecastArray[0].icon);
  const gif = document.createElement("img");
  gif.src = imgURL;
  gif.classList.add("weather-gif");

  let currentIndex = 0;

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  const card = document.createElement("div");
  card.classList.add("card");


  const prevBtn = document.createElement("button");
  prevBtn.textContent = "⟨";
  prevBtn.classList.add("prevBtn", "controlBtn")

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "⟩";
  nextBtn.classList.add("nextBtn", "controlBtn")

  function renderCard(currentIndex) {
    const day = forecastArray[currentIndex];
    card.innerHTML = "";

    const h1 = document.createElement("h1");
    h1.textContent = `${day.temperature}°C`;

    const description = document.createElement("p");
    description.textContent = day.description;

    const date = document.createElement("p");
    date.textContent = day.date;
    date.id = "date"

    const icon = document.createElement("img");
    icon.src = `/icons/${day.icon}.svg`;
    icon.classList.add("weather-icon");

    const tempAndImage = document.createElement("div");
    tempAndImage.classList.add("temp-and-image")

    const otherData = document.createElement("div");
    tempAndImage.classList.add("other-data")


    tempAndImage.appendChild(h1)
    tempAndImage.appendChild(icon)
   
    card.append(tempAndImage, description, otherData, date);
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + forecastArray.length) % forecastArray.length;
    renderCard(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % forecastArray.length;
    renderCard(currentIndex);
  });

  cardContainer.append(prevBtn, card, nextBtn);
  content.appendChild(cardContainer);
  content.appendChild(gif);

  renderCard(currentIndex);
}

// async function showWeather(forecastArray) {
// //   const { currentTemperature, iconName, description } = weatherData;
//   const backgroundImageURL = await BackgroundSearch(forecastArray[0].icon)
// //   const { imgURL } = iconData;
//   const h1 = document.createElement("h1");
//   const h2 = document.createElement("h2");
//   const content = document.getElementById("content");
//   const tempAndImage = document.createElement("div");
//   const img = document.createElement("img");
//   const card = document.createElement("div");
//   const weatherIcon = document.createElement("img");

//   h1.classList.add('current-temperature')
//   h2.classList.add('weather-description')
//   tempAndImage.classList.add("temp-and-image")
//   img.classList.add('weather-gif')
//   weatherIcon.classList.add('weather-icon')
//   card.classList.add('card')

//   content.innerHTML = "";

//   h1.innerHTML = `${currentTemperature}`;
//   h2.innerHTML = `${description}`;
//   img.src = backgroundImageURL;
// //   body.style.backgroundImage = `url(${imgURL})`
//   weatherIcon.src = `/icons/${iconName}.svg`;

//   tempAndImage.appendChild(h1)
//   tempAndImage.appendChild(weatherIcon)
//   card.appendChild(tempAndImage);
//   card.appendChild(h2);

//   content.appendChild(card)
//   content.appendChild(img);
// }
