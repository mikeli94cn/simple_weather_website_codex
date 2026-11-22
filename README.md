# Daylight weather

A responsive weather website built with HTML5, CSS3, and vanilla JavaScript. No build step or API key required.

## Deploy on Debian 13 with Docker

Install Docker Engine with the Buildx and Docker Compose plugins on the server. [Docker's Debian installation guide](https://docs.docker.com/engine/install/debian/)

From the project directory on the server, run:

```sh
docker compose up -d --build --wait
docker compose ps
curl -fsS http://127.0.0.1:80/ -o /dev/null
```

The container serves the static site with Nginx on a Debian 13 base image. It runs as `www-data` and needs no database, persistent volume, secrets, or API key. The browser contacts Open-Meteo directly for forecasts and city search.

Compose publishes HTTP on `127.0.0.1:80` by default. For remote access with geolocation, configure an HTTPS reverse proxy on the host to forward to that address. To expose plain HTTP directly for LAN access, set `WEATHER_BIND_ADDRESS=0.0.0.0`. To change the host port or bind address persistently, add the values to a `.env` file next to `compose.yaml` before starting Compose. For example:

```dotenv
WEATHER_BIND_ADDRESS=0.0.0.0
WEATHER_PORT=8000
```

To deploy an update, run `docker compose up -d --build --wait` again after updating the project files. Use `docker compose logs -f weather` to view logs and `docker compose down` to stop the deployment.

If the build stalls while downloading Debian package indexes, cancel it with Ctrl+C and use `docker compose --progress=plain build` to see APT's full output. The Dockerfile sets a 20-second network inactivity timeout, two retries for APT requests, and a three-minute timeout for each APT command.

To skip package downloads on the server, build on another machine with the same CPU architecture and export the image with `docker image save -o daylight-weather.tar daylight-weather:local`. On the server, copy over the archive and `compose.yaml`, then run:

```sh
docker image load -i daylight-weather.tar
docker compose up -d --no-build --wait
```

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
