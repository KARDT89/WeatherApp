import './styles.css';
import './uiController.js';
import "./switch.css"

document.addEventListener('DOMContentLoaded', () => {
	const content = document.getElementById('content');
	const welcome = document.createElement('div');
	welcome.id = 'welcome';
	welcome.innerHTML = `<div class="theodinproject">
							<p>The Odin Project</p>
							<img id="TOP" src="/odin-lined.png" alt="TOP" /> <p>Weather App</p>
						</div>
						<p class="footer">
							Made with ❤️ by
							<a href="https://github.com/KARDT89" target="_blank" id="dt89">DT89</a>
						</p>
`;

	content.appendChild(welcome);
	
});



