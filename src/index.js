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

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.description}`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${response.data.wind.speed}`;
  document.querySelector(
    "#humid"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
let enterCity = document.querySelector("#newLocale");
enterCity.addEventListener("submit", handleSubmit);

let enterCity = document.querySelector("#newLocale");
coordsUrl.addEventListener("click", getCurrentCity);

searchCity("North Vancouver");
