document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("weather-form");
    const cityInput = document.getElementById("city-input");
    const loader = document.getElementById("loader");
    const errorMessage = document.getElementById("error-message");
    const weatherInfo = document.getElementById("weather-info");
    
    const weatherIcon = document.getElementById("weather-icon");
    const temperature = document.getElementById("temperature");
    const cityName = document.getElementById("city-name");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("wind-speed");
  
    const API_KEY = "4f0e9a2e0a3b0f51ad07bf2edee3aac5";
    const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  
    const weatherIcons = {
      Clouds: "img/clouds.png",
      Clear: "img/clear.png",
      Rain: "img/rain.png",
      Drizzle: "img/drizzle.png",
      Mist: "img/mist.png",
      Snow: "img/snow.png",
      Thunderstorm: "img/thunderstorm.png",
    };
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const city = cityInput.value.trim();
      
      if (!city) {
        alert("Please enter a city name.");
        return;
      }
  
      // Reset UI
      weatherInfo.classList.add("d-none");
      errorMessage.classList.add("d-none");
      loader.classList.remove("d-none");
  
      try {
        const response = await fetch(`${API_URL}${encodeURIComponent(city)}&appid=${API_KEY}`);
        const data = await response.json();
  
        if (response.ok) {
          updateWeather(data);
        } else {
          throw new Error(data.message || "Unable to fetch weather data.");
        }
      } catch (error) {
        showError(error.message);
      } finally {
        loader.classList.add("d-none");
      }
  
      cityInput.value = "";
    });
  
    function updateWeather(data) {
      const weatherMain = data.weather[0].main;
      weatherIcon.src = weatherIcons[weatherMain] || "img/default.png";
      weatherIcon.alt = weatherMain;
  
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      cityName.textContent = data.name;
      humidity.innerHTML = `<strong>${data.main.humidity}%</strong>`;
      windSpeed.innerHTML = `<strong>${data.wind.speed} km/h</strong>`;
  
      weatherInfo.classList.remove("d-none");
    }
  
    function showError(message) {
      errorMessage.textContent = message;
      errorMessage.classList.remove("d-none");
    }
  });
  