const GIPHY = process.env.GIPHY_API_KEY;

const giphyapi = 'XTmlPQGVt2gLHZ6E98mAtOZrORU90rNF';
const weatherapi = 'CXQXNL67TVZFX9CQYHTREL5LG';

const currentUnitForm = document.getElementById('switch');
currentUnitForm.addEventListener('submit', e => {
	e.preventDefault();
	const checkbox = e.target['unit'].checked;
	console.log(checkbox);
});

export async function weatherSearch(location) {
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${weatherapi}&unitGroup=uk`;
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

		const forecast = json.days.slice(0, 8).map(day => ({
			date: day.datetime,
			temperature: day.temp,
			icon: day.icon,
			condition: day.conditions,
			description: day.description,
			humidity: day.humidity,
			feelslike: day.feelslike,
			windspeed: day.windspeed,
			precipitation: day.precipcover,
		}));

		return [forecast, json.resolvedAddress];
	} catch (error) {
		console.error(error.message);
	}
}

export async function BackgroundSearch(bg) {
	const url = `https://api.giphy.com/v1/gifs/translate?api_key=${giphyapi}&s=${bg}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		let data = {};
		const json = await response.json();
		data.imgURL = json.data.images['original'].url;

		return data;
	} catch (error) {
		console.error(error.message);
	}
}
