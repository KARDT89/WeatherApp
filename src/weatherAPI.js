const GIPHY = process.env.GIPHY_API_KEY;

export async function weatherSearch(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${process.env.WEATHER_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    let data = {};
    const json = await response.json();
    const { description } = json;
    data.currentTemperature = json.currentConditions.temp;
    data.iconName = json.currentConditions.icon;
    data.description = description;

    return data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function IconSearch(icon) {
  const url = `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY}&s=${icon}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    let data = {};
    const json = await response.json();
    data.imgURL = json.data.images["original"].url;

    return data;
  } catch (error) {
    console.error(error.message);
  }
}
