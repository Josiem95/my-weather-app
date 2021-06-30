let now = new Date();

let currentDay = document.querySelector("#current-day");

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let day = weekdays[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 0) {
  minute = `0${minute}`;
}

currentDay.innerHTML = `${day} ${month} ${date}, ${hour}:${minute}`;

//

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function searchCity(city) {
  let apiKey = "9d57b8dfa7c27b11f72c0eaad45b73c1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city").value;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityInput;
  searchCity(cityInput);
}

function searchLocation(position) {
  let apiKey = "9d57b8dfa7c27b11f72c0eaad45b73c1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function getForecast(coordinates) {
  let apiKey = "9d57b8dfa7c27b11f72c0eaad45b73c1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = `${Math.round(
    celsiusTemperature
  )}°`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.description}`;
  document.querySelector("#wind").innerHTML = `${response.data.wind.speed}`;
  document.querySelector("#humid").innerHTML = `${response.data.main.humidity}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    "#currentIcon"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" />`;

  getForecast(response.data.coord);

  celsiusTemperature = response.data.main.temp;
}

function displayFTemp(event) {
  event.preventDefault();
  let fahrTemperature = (celsiusTemperature * 9) / 5 + 32;
  cLink.classList.remove("active");
  fLink.classList.add("active");
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = `${Math.round(fahrTemperature)}°F`;
}

function displayCTemp(event) {
  event.preventDefault;
  cLink.classList.add("active");
  fLink.classList.remove("active");
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  
            <div class="col days">
              ${formatDay(forecastDay.dt)}
              </br>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" />
              </br>
              <span class="temp-max">${Math.round(
                forecastDay.temp.max
              )}° | </span>
              <span class="temp-min">${Math.round(forecastDay.temp.min)}°</span>
            </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let fLink = document.querySelector("#fahrLink");
fLink.addEventListener("click", displayFTemp);

let cLink = document.querySelector("#celsiusLink");
cLink.addEventListener("click", displayCTemp);

let celsiusTemperature = null;

let enterCity = document.querySelector("#newLocale");
enterCity.addEventListener("submit", handleSubmit);

let coordsUrl = document.querySelector("#coordsUrl");
coordsUrl.addEventListener("click", getCurrentCity);

searchCity("North Vancouver");
