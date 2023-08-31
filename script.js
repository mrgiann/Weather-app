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

function getWindDirectionDescription(degrees) {
  if (degrees >= 337.5 || degrees < 22.5) {
    return "Norte";
  } else if (degrees >= 22.5 && degrees < 67.5) {
    return "Noreste";
  } else if (degrees >= 67.5 && degrees < 112.5) {
    return "Este";
  } else if (degrees >= 112.5 && degrees < 157.5) {
    return "Sureste";
  } else if (degrees >= 157.5 && degrees < 202.5) {
    return "Sur";
  } else if (degrees >= 202.5 && degrees < 247.5) {
    return "Suroeste";
  } else if (degrees >= 247.5 && degrees < 292.5) {
    return "Oeste";
  } else if (degrees >= 292.5 && degrees < 337.5) {
    return "Noroeste";
  }
}

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
        const country = data.sys.country;
        const feelsLike = data.main.feels_like;
        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        const windSpeed = data.wind.speed * 3.6;
        const windDirection = data.wind.deg;
        const windDirectionDescription = getWindDirectionDescription(windDirection);
        const weatherIconCode = data.weather[0].icon;

        errorElement.innerHTML = "";
        cityElement.innerHTML = `Resultados para ${cityName}, ${country}`;
        temperatureDisplay.innerHTML = `<p>${temperature}°C</p>`;

        additionalInfo.innerHTML = `
        <li>Sensación térmica: ${feelsLike}°C</li>
        <li>Humedad: ${humidity}%</li>
        <li>Presión: ${pressure} hPa</li>
        <li>Velocidad del viento: ${windSpeed.toFixed(2)} km/h</li>
        <li>Dirección del viento: ${windDirectionDescription} (${windDirection}°)</li>
        <li>Nubes: ${weatherDescription}</li>
        `;

        weatherIcon.src = `http://openweathermap.org/img/w/${weatherIconCode}.png`;
      })
      .catch(error => {
        errorElement.innerHTML = "<p>No se pudo obtener la información del clima para esa ubicación.</p>";
        additionalInfo.innerHTML = "";
        cityElement.innerHTML = "";
        temperatureDisplay.innerHTML = ""
        weatherIcon.src = "";

        console.error(error);
      });
  }
}
