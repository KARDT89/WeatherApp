import "./styles.css";

async function weatherSearch(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${process.env.WEATHER_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json
    

  } catch (error) {
    console.error(error.message);
  }
}

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
  h1.innerHTML = `${currentTemparature} U+000B0. F`;
  console.log(h1);

  content.appendChild(h1);
}
