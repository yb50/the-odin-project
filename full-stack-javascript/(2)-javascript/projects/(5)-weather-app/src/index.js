import "./style.css";

const VISUAL_CROSSING_KEY = "Q8TF32FK2V6NKNWF3GM8RVNFD";

let unit = "C";
let uiHasBeenBuilt = false;
let lastResponseCache = null;

// ----- Unit Converter & Rounder -----

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function roundToInt(number) {
  return Math.round(number);
}

// ----- Weather Emojis -----

function weatherEmoji(iconName) {
  const map = {
    "clear-day": "☀️",
    "clear-night": "🌙",
    rain: "🌧️",
    snow: "❄️",
    sleet: "🌨️",
    wind: "💨",
    fog: "🌫️",
    cloudy: "☁️",
    "partly-cloudy-day": "⛅",
    "partly-cloudy-night": "☁️",
    thunderstorm: "⛈️",
    hail: "🧊",
  };
  return map[iconName] || "☁️";
}

// ----- Theme Per Weather -----

function chooseThemeName(tempC, iconName) {
  const icon = (iconName || "cloudy").toLowerCase();
  const t = typeof tempC === "number" ? tempC : 0;

  if (
    icon.includes("thunder") ||
    icon.includes("rain") ||
    icon.includes("sleet") ||
    icon.includes("hail") ||
    icon.includes("fog")
  ) {
    return "storm";
  } else if (icon.includes("clear")) {
    return "clear";
  } else if (t >= 23) {
    return "warm";
  } else if (t <= 5) {
    return "cold";
  } else {
    return "";
  }
}

function applyThemeFrom(tempC, iconName) {
  const theme = chooseThemeName(tempC, iconName);
  document.body.className = theme ? "theme-" + theme : "";
}

// ----- Format Helpers -----

function formatTemperature(celsiusValue) {
  if (celsiusValue == null) return "—";
  if (unit === "C") return roundToInt(celsiusValue) + "°C";
  return roundToInt(celsiusToFahrenheit(celsiusValue)) + "°F";
}

function formatWindSpeed(kmh) {
  let kmhValue = kmh == null ? 0 : kmh;
  if (unit === "C") return roundToInt(kmhValue) + " km/h";
  const mph = kmhValue / 1.609;
  return roundToInt(mph) + " mph";
}

function formatDayLabel(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// ----- UI -----

function buildUIIfNeeded() {
  if (uiHasBeenBuilt) return;

  const panel = document.createElement("div");
  panel.className = "result";

  const currentSection = document.createElement("div");
  currentSection.className = "current";

  const forecastSection = document.createElement("div");
  forecastSection.className = "forecast";

  const title = document.createElement("h3");
  title.textContent = "Next 5 days";

  const grid = document.createElement("div");
  grid.className = "forecast-grid";

  forecastSection.appendChild(title);
  forecastSection.appendChild(grid);

  panel.appendChild(currentSection);
  panel.appendChild(forecastSection);
  document.body.appendChild(panel);

  // ----- Temperature Unit Toggle Button -----

  const toggleButton = document.createElement("button");
  toggleButton.className = "toggle";
  toggleButton.textContent = "°C";
  toggleButton.title = "Toggle °C/°F";
  document.querySelector(".search-box").appendChild(toggleButton);

  toggleButton.addEventListener("click", () => {
    unit = unit === "C" ? "F" : "C";
    toggleButton.textContent = "°" + unit;
    if (lastResponseCache) renderAll(lastResponseCache);
  });

  uiHasBeenBuilt = true;
}

// ----- Fetch Weather Data -----
async function fetchWeatherFor(query) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(query)}?key=${VISUAL_CROSSING_KEY}&unitGroup=metric&include=days,current&contentType=json&iconSet=icons2`;
  const response = await fetch(url);
  return await response.json();
}

function renderCurrentSection(weatherSection, weatherData, currentWeather) {
  const locationName = weatherData.resolvedAddress || weatherData.address || "Unknown location";
  const temperatureCelsius = typeof currentWeather.temp === "number" ? currentWeather.temp : 0;
  const feelsLikeCelsius = typeof currentWeather.feelslike === "number" ? currentWeather.feelslike : temperatureCelsius;
  const icon = currentWeather.icon || "cloudy";
  const conditionText = currentWeather.conditions || "";
  const windSpeedKmh = typeof currentWeather.windspeed === "number" ? currentWeather.windspeed : 0;

  // ----- Row 1 -----
  const topRow = document.createElement("div");
  topRow.className = "row";

  const bigTemperature = document.createElement("div");
  bigTemperature.className = "big";
  bigTemperature.textContent = weatherEmoji(icon) + " " + formatTemperature(temperatureCelsius);

  const location = document.createElement("div");
  location.className = "place";
  location.textContent = locationName;

  topRow.appendChild(bigTemperature);
  topRow.appendChild(location);

  // ----- Row 2 -----
  const detailsRow = document.createElement("div");
  detailsRow.className = "row";

  const detailTexts = [];
  if (conditionText) {
    detailTexts.push(conditionText);
  }
  detailTexts.push("Feels " + formatTemperature(feelsLikeCelsius));
  detailTexts.push("Wind " + formatWindSpeed(windSpeedKmh));

  for (let i = 0; i < detailTexts.length; i++) {
    if (i > 0) {
      const separator = document.createElement("span");
      separator.textContent = " · ";
      detailsRow.appendChild(separator);
    }
    const detailSpan = document.createElement("span");
    detailSpan.textContent = detailTexts[i];
    detailsRow.appendChild(detailSpan);
  }

  weatherSection.replaceChildren(topRow, detailsRow);
}

// ----- 5-Day Forecast -----
function renderForecastSection(gridLayout, dayArray) {
  gridLayout.textContent = "";

  for (let i = 0; i < dayArray.length; i++) {
    const day = dayArray[i];

    const dateLabel = formatDayLabel(day.datetime);
    const iconName = day.icon || "cloudy";
    const highTemp = formatTemperature(day.tempmax);
    const lowTemp = formatTemperature(day.tempmin);
    const summary = day.conditions || "";

    const card = document.createElement("div");
    card.className = "day";

    const labelDiv = document.createElement("div");
    labelDiv.className = "label";
    labelDiv.textContent = dateLabel;

    const iconDiv = document.createElement("div");
    iconDiv.className = "icon";
    iconDiv.textContent = weatherEmoji(iconName);

    const tempsDiv = document.createElement("div");
    tempsDiv.className = "temps";

    const highBold = document.createElement("b");
    highBold.textContent = highTemp;

    const slashSpan = document.createElement("span");
    slashSpan.textContent = " / ";

    const lowSpan = document.createElement("span");
    lowSpan.textContent = lowTemp;

    tempsDiv.appendChild(highBold);
    tempsDiv.appendChild(slashSpan);
    tempsDiv.appendChild(lowSpan);

    const sumDiv = document.createElement("div");
    sumDiv.className = "sum";
    sumDiv.textContent = summary;

    card.appendChild(labelDiv);
    card.appendChild(iconDiv);
    card.appendChild(tempsDiv);
    card.appendChild(sumDiv);

    gridLayout.appendChild(card);
  }
}

// ----- Rendering -----
function renderAll(fullJson) {
  lastResponseCache = fullJson;
  buildUIIfNeeded();

  const current = fullJson && fullJson.currentConditions ? fullJson.currentConditions : {};
  const days = fullJson && Array.isArray(fullJson.days) ? fullJson.days.slice(0, 5) : [];

  const tempC = typeof current.temp === "number" ? current.temp : 0;
  const iconName = current.icon || "cloudy";
  applyThemeFrom(tempC, iconName);

  const currentBox = document.querySelector(".current");
  const forecastGrid = document.querySelector(".forecast-grid");

  renderCurrentSection(currentBox, fullJson, current);
  renderForecastSection(forecastGrid, days);
}

// ----- Searchbox -----
const input = document.querySelector(".search-box input");
const btn = document.querySelector(".search-box button");

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") btn.click();
});

btn.addEventListener("click", async function () {
  const userQuery = input.value.trim();
  if (userQuery.length === 0) {
    alert("Type a location");
    return;
  }

  const previousText = btn.textContent;
  btn.textContent = "Loading…";
  btn.disabled = true;

  try {
    const json = await fetchWeatherFor(userQuery);
    renderAll(json);
  } catch (err) {
    const message =
      err && err.message
        ? err.message
        : "Could not fetch weather. Check your API key or spelling.";
    alert("Could not fetch weather. " + message);
  } finally {
    btn.textContent = previousText;
    btn.disabled = false;
  }
});
