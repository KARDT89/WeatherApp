import { weatherSearch, BackgroundSearch } from './weatherAPI.js';
import { formatDateToLong } from './utils/formatDateToLong.js';

const form = document.getElementById('weather-form');

form.addEventListener('submit', async e => {
	e.preventDefault();
	const location = e.target['location'].value;
	const forecastArray = await weatherSearch(location);
	console.log(forecastArray);

	if (forecastArray === undefined) {
		badSearch();
	} else {
		showWeather(forecastArray);
	}
});

function badSearch() {
	const content = document.getElementById('content');
	content.innerHTML = '';
	const h1 = document.createElement('h1');
	h1.innerHTML = "Sorry, this city doesn't exist";
	content.append(h1);
}

async function showWeather(arr) {
	const content = document.getElementById('content');
	content.innerHTML = '';
	let [forecastArray, address] = arr;
	const { imgURL } = await BackgroundSearch(forecastArray[0].icon);
	const gif = document.createElement('img');
	gif.src = imgURL;
	gif.classList.add('weather-gif');

	let currentIndex = 0;

	const cardContainer = document.createElement('div');
	cardContainer.classList.add('card-container');

	const card = document.createElement('div');
	card.classList.add('card');

	const prevBtn = document.createElement('button');
	prevBtn.textContent = '⟨';
	prevBtn.classList.add('prevBtn', 'controlBtn');

	const nextBtn = document.createElement('button');
	nextBtn.textContent = '⟩';
	nextBtn.classList.add('nextBtn', 'controlBtn');

	function renderCard(currentIndex) {
		const day = forecastArray[currentIndex];
		card.innerHTML = '';

		const h1 = document.createElement('h1');
		const feelsLike = document.createElement('p');
		feelsLike.classList.add('feels-like');

		// logic to handle c to f
		if (document.getElementById('unit').checked === false) {
			h1.textContent = `${day.temperature}°C`;
			feelsLike.innerHTML = `Feels Like: ${day.feelslike}°C`;
		} else {
			let fahrenheit = (day.temperature * 9) / 5 + 32;
			let fahrenheitFeelsLike = (day.feelslike * 9) / 5 + 32;
			h1.textContent = `${fahrenheit.toFixed(2)}°F`;
			feelsLike.innerHTML = `Feels Like: ${fahrenheitFeelsLike.toFixed(2)}°F`;
		}
		document.getElementById('unit').addEventListener('change', function () {
			if (!this.checked) {
				h1.textContent = `${day.temperature}°C`;
				feelsLike.innerHTML = `Feels Like: ${day.feelslike}°C`;
			} else {
				let fahrenheit = (day.temperature * 9) / 5 + 32;
				let fahrenheitFeelsLike = (day.feelslike * 9) / 5 + 32;
				h1.textContent = `${fahrenheit.toFixed(2)}°F`;
				feelsLike.innerHTML = `Feels Like: ${fahrenheitFeelsLike.toFixed(2)}°F`;
			}
		});

		const place = document.createElement('p');
		place.id = 'address';
		place.textContent = address;

		const date = document.createElement('p');
		date.innerHTML = `<h3>${day.condition}</h3> Prediction: ${day.description}<br/><br/>
		${formatDateToLong(day.date)}`;
		date.id = 'date';

		const icon = document.createElement('img');
		icon.src = `/icons/${day.icon}.svg`;
		icon.classList.add('weather-icon');

		const tempAndImage = document.createElement('div');
		tempAndImage.classList.add('temp-and-image');

		const otherData = document.createElement('div');
		otherData.classList.add('other-data');

		tempAndImage.appendChild(icon);
		tempAndImage.appendChild(h1);

		const humidity = document.createElement('p');
		humidity.innerHTML = `Humidity: ${day.humidity}%`;

		const windspeed = document.createElement('p');
		windspeed.innerHTML = `Wind: ${day.windspeed}km/h`;

		const precipitation = document.createElement('p');
		precipitation.innerHTML = `Precipitation: ${day.precipitation}%`;

		const topData = document.createElement('div');
		topData.id = 'top-data';

		otherData.append(feelsLike, humidity, precipitation, windspeed);

		topData.append(tempAndImage, otherData);

		card.append(topData, place, date);
	}

	prevBtn.addEventListener('click', () => {
		currentIndex =
			(currentIndex - 1 + forecastArray.length) % forecastArray.length;
		renderCard(currentIndex);
	});

	nextBtn.addEventListener('click', () => {
		currentIndex = (currentIndex + 1) % forecastArray.length;
		renderCard(currentIndex);
	});

	const footer = document.createElement('div');
	footer.innerHTML = `<p class="footer2">
							Made with ❤️ by
							<a href="https://github.com/KARDT89" target="_blank" id="dt89">DT89</a>
						</p>`;

	cardContainer.append(prevBtn, card, nextBtn);
	content.appendChild(cardContainer);
	content.appendChild(footer);
	content.appendChild(gif);

	renderCard(currentIndex);
}
