const GIPHY = process.env.GIPHY_API_KEY;

export async function weatherSearch(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${process.env.WEATHER_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    // let data = {};
    const json = await response.json();
    // const { description } = json;
    // data.currentTemperature = json.currentConditions.temp;
    // data.iconName = json.currentConditions.icon;
    // data.description = description;
    const forecast = json.days.slice(0, 5).map((day) => ({
      date: day.datetime,
      temperature: day.temp,
      icon: day.icon,
      description: day.conditions,
    }));

    return forecast;
  } catch (error) {
    console.error(error.message);
  }
}

export async function BackgroundSearch(bg) {
  const url = `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY}&s=${bg}`;
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
