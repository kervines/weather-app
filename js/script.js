const form = document.querySelector('#form');
const btn = document.querySelector('#btn-search');
const inputCity = document.querySelector('#city');
const resultContainer = document.querySelector('.result-container');
const apiKey = '7d86fa86e8a10363930db58a41a3c7be';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (inputCity.value) {
    fetchWeather(inputCity.value);
  }
});
async function fetchWeather(city) {
  loading();
  const responseWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const dadosWeather = await responseWeather.json();
  console.log(dadosWeather);
  const {
    main: { temp, humidity },
    wind: { speed },
    weather: [{ icon }],
  } = dadosWeather;
  console.log(icon);

  createResult(
    inputCity.value,
    temp.toFixed(1),
    humidity,
    (speed * 3.6).toFixed(1),
    icon
  );
}

function loading() {
  resultContainer.innerHTML = `
  <div class="loading">
  </div>
  `;
}

function createResult(city, temp, humidity, wind, icon) {
  resultContainer.innerHTML = `<div class="temp-container">
  <img src='https://openweathermap.org/img/wn/${icon}@2x.png'>
  <h1>${temp}°</h1>
  <h2>${city}</h2>
</div>
<div class="humidity">
  <i class="fa-solid fa-water"></i>
  <p>${humidity}%</p>
</div>
<div class="wind">
  <i class="fa-solid fa-wind"></i>
  <p>${wind} km/h</p>
</div>`;
}
