# Daylight weather

A responsive weather website built with HTML5, CSS3, and vanilla JavaScript. No build step or API key required.

## Run locally

From this folder, run:

```sh
python3 -m http.server 8000
```

Visit http://localhost:8000 in a modern browser. Stop the server with Ctrl+C.

Internet access is required for live weather. Location detection requires permission and a secure context (HTTPS or localhost). For phones, a plain HTTP LAN address may not allow geolocation; use HTTPS hosting for that feature.

## Features

- London weather on first load, without prompting for location permission.
- City search with a choice of matching cities, including region and country.
- Current temperature, conditions, humidity, wind speed, and feels-like temperature.
- Five forecast days after today, with daily highs, lows, conditions, and precipitation probability.
- Local weather using the browser Geolocation API. GPS results show “Your location” and coordinates because Open-Meteo does not provide reverse geocoding.
- Loading status, request timeouts, cancellation of superseded searches, and helpful error messages.
- Responsive layout, keyboard-accessible controls, and live status announcements.

## Files

- `index.html`: semantic page structure.
- `style.css`: layout, styling, and mobile adjustments.
- `script.js`: geocoding, weather requests, and interface updates.

## Data and assets

City search uses the [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api). Weather uses the [Open-Meteo Forecast API](https://open-meteo.com/en/docs) with Celsius, km/h, and the destination’s local timezone. Weather icons are native emoji; their appearance varies by platform. Google Fonts supplies DM Sans and Manrope, with local sans-serif fallbacks if unavailable. Weather data attribution appears in the footer. Review Open-Meteo’s terms before commercial use.

## Languages

Click the 🌐 language button in the header to cycle through English, Simplified Chinese (简体中文), and Spanish (Español). The interface, weather conditions, forecast dates, and status/error messages update immediately without fetching weather again. The choice is saved in browser local storage when available. New city searches request place names in the selected language; previously loaded place names retain the API’s original spelling.
