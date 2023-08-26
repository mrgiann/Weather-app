const apiKey = "6c3c38a6bf4a4b72e7c8fba627489279";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

// Obtener elementos del DOM
const searchButton = document.getElementById("search-button");
const temperatureDisplay = document.getElementById("temperature-display");
const additionalInfo = document.getElementById("additional-info");
const searchInput = document.getElementById("search-input");
const weatherIcon = document.getElementById("weather-icon"); 
const cityElement = document.getElementById("city-element");
const errorElement = document.getElementById("error");

// Agregar un evento click al botón de búsqueda
searchButton.addEventListener("click", searchWeather);
searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchWeather();
  }
});

function searchWeather() {
  const searchValue = searchInput.value.trim();

  if (searchValue) {
    const query = `${apiUrl}q=${encodeURIComponent(searchValue)}&appid=${apiKey}&units=metric&lang=es`;

    fetch(query)
      .then(response => response.json())
      .then(data => {
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const cityName = data.name;
        const feelsLike = data.main.feels_like;
        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        const windSpeed = data.wind.speed;
        const windDirection = data.wind.deg;
        const weatherIconCode = data.weather[0].icon; // Nuevo código para el icono

        errorElement.innerHTML = "";
        cityElement.innerHTML = `Resultados para ${data.name}`;
        temperatureDisplay.innerHTML = `<p>${temperature}°C</p>`;

        additionalInfo.innerHTML = `
        <li>Sensación térmica: ${feelsLike}°C</li>
        <li>Humedad: ${humidity}%</li>
        <li>Presión: ${pressure} hPa</li>
        <li>Velocidad del viento: ${windSpeed} m/s</li>
        <li>Dirección del viento: ${windDirection}°</li>
        <li>Nubes: ${weatherDescription}</li>
        `;

        // Insertar el icono del clima
        weatherIcon.src = `http://openweathermap.org/img/w/${weatherIconCode}.png`;
      })
      .catch(error => {
        errorElement.innerHTML = "<p>No se pudo obtener la información del clima para esa ubicación.</p>";
        additionalInfo.innerHTML = ""; // Limpiar la información adicional
        cityElement.innerHTML = ""; // Limpia la ciudad
        temperatureDisplay.innerHTML = "" // Limpia la temperatura
        weatherIcon.src = ""; // Limpia el icono

        console.error(error);
      });
  }
}
