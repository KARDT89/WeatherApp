import './styles.css';
import './uiController.js';
import './switch.css';
// import odinlined from "../src/public/odi"

document.addEventListener('DOMContentLoaded', () => {
	const content = document.getElementById('content');
	const welcome = document.createElement('div');
	welcome.id = 'welcome';
	welcome.innerHTML = `<div class="theodinproject">
							<p>The Odin Project</p>
							<img id="TOP" src="https://cdn.statically.io/gh/TheOdinProject/curriculum/5f37d43908ef92499e95a9b90fc3cc291a95014c/html_css/project-sign-up-form/odin-lined.png" alt="TOP" /> <p>Weather App</p>
						</div>
`;

	content.appendChild(welcome);
});
