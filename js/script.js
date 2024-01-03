const form = document.querySelector('#form');
const btn = document.querySelector('#btn-search');
const inputCity = document.querySelector('#city');
const resultContainer = document.querySelector('.result-container');
const apiKey = ''; //add api key

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (inputCity.value) {
    fetchWeather(inputCity.value);
  }
});

async function fetchWeather(city) {
  const responseWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const dadosWeather = await responseWeather.json();
  createResult(
    inputCity.value,
    dadosWeather.main.temp.toFixed(1),
    dadosWeather.main.humidity,
    (dadosWeather.wind.speed * 3.6).toFixed(1),
    dadosWeather.weather.icon
  );
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
