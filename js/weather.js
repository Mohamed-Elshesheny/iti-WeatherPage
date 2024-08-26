document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "e61e99426a944f9280b231722242408";
  let city = "canda"; // Default city

  function getWeather() {
  //   city = document.getElementById("locationInput").value || city;
  //   const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const forecastContainer = document.getElementById("forecast");
  //       forecastContainer.innerHTML = ""; // Clear previous results
  //       const forecastDays = data.forecast.forecastday;

  //       forecastDays.forEach((day) => {
  //         const date = new Date(day.date).toLocaleDateString("en-GB", {
  //           weekday: "long",
  //           day: "numeric",
  //           month: "long",
  //         });
  //         const temp = Math.round(day.day.avgtemp_c);
  //         const weatherDescription = day.day.condition.text;
  //         const icon = `https:${day.day.condition.icon}`;

  //         const forecastDay = document.createElement("div");
  //         forecastDay.className = "forecast-day";

  //         forecastDay.innerHTML = `
  //                         <h2>${date}</h2>
  //                         <p>Temperature: ${temp}°C</p>
  //                         <p>${weatherDescription}</p>
  //                         <img src="${icon}" alt="${weatherDescription}">
  //                     `;

  //         forecastDay.addEventListener("click", () => {
  //           showWeatherDetails(day);
  //         });

  //         forecastContainer.appendChild(forecastDay);
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching weather data:", error);
  //       const forecastContainer = document.getElementById("forecast");
  //       forecastContainer.innerHTML = "<p>Unable to retrieve weather data.</p>";
  //     });
  // }
  city = document.getElementById("locationInput").value || city;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("currentLocation").innerText = data.location.name;
      const forecastContainer = document.getElementById("forecast");
      forecastContainer.innerHTML = ""; // Clear previous results
      const forecastDays = data.forecast.forecastday;

      forecastDays.forEach((day) => {
        const date = new Date(day.date).toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
        });
        const temp = Math.round(day.day.avgtemp_c);
        const weatherDescription = day.day.condition.text;
        const icon = `https:${day.day.condition.icon}`;

        const forecastDay = document.createElement("div");
        forecastDay.className = "forecast-day";

        forecastDay.innerHTML = `
          <h2>${date}</h2>
          <p>Temperature: ${temp}°C</p>
          <p>${weatherDescription}</p>
          <img src="${icon}" alt="${weatherDescription}">
        `;

        forecastDay.addEventListener("click", () => {
          showWeatherDetails(day);
        });

        forecastContainer.appendChild(forecastDay);
      });
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      const forecastContainer = document.getElementById("forecast");
      forecastContainer.innerHTML = "<p>Unable to retrieve weather data.</p>";
    });}


  function showWeatherDetails(day) {
    const modal = document.getElementById("weatherModal");
    const modalBody = document.getElementById("modalBody");
    const closeBtn = document.getElementsByClassName("close")[0];

    const date = new Date(day.date).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    modalBody.innerHTML = `
              <h2>${date}</h2>
              <p>Temperature: ${Math.round(day.day.avgtemp_c)}°C</p>
              <p>Condition: ${day.day.condition.text}</p>
              <p>Humidity: ${day.day.avghumidity}%</p>
              <p>Wind: ${day.day.maxwind_kph} kph</p>
              <p>Chance of Rain: ${day.day.daily_chance_of_rain}%</p>
              <img src="https:${day.day.condition.icon}" alt="${
                day.day.condition.text
              }">
          `;

    modal.style.display = "block";

    closeBtn.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  // Initial fetch for the default city
  getWeather();

  // Attach event listener to the search button
  document.querySelector("button").addEventListener("click", getWeather);
});
