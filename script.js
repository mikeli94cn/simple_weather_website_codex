'use strict';

const $ = (id) => document.getElementById(id);
const status = $('status');
let requestNumber = 0;
let controller;

const languages = ['en', 'zh-CN', 'es'];
const languageNames = { en: 'English', 'zh-CN': '简体中文', es: 'Español' };
let language = 'en';
try {
  const saved = localStorage.getItem('daylight-language');
  if (languages.includes(saved)) language = saved;
} catch { /* Storage may be disabled; switching still works. */ }
const translations = {
  "zh-CN": {
    "A little clarity for your day.": "让每一天更明朗。",
    "YOUR DAILY OUTLOOK": "每日天气概览",
    "Good days start": "美好的一天",
    "with a little foresight.": "从了解天气开始。",
    "Wherever you’re headed, know what’s ahead.": "无论去往哪里，提前了解天气。",
    "Find your weather": "查询天气",
    "Search city": "搜索城市",
    "Search for a city…": "搜索城市…",
    "Search": "搜索",
    "Use my location": "使用我的位置",
    "Matching cities": "匹配的城市",
    "CURRENT WEATHER": "当前天气",
    "Your next destination": "你的下一个目的地",
    "Search a city to find your forecast": "搜索城市，查看天气预报",
    "Right now": "此刻",
    "A fresh perspective, rain or shine.": "无论晴雨，开启全新一天。",
    "HUMIDITY": "湿度",
    "WIND SPEED": "风速",
    "FEELS LIKE": "体感温度",
    "Weather for wherever life takes you.": "无论走到哪里，天气尽在掌握。",
    "The next 5 days": "未来五天",
    "Your week, at a glance": "一周天气，一目了然",
    "Find a city above to see what’s on the horizon.": "在上方搜索城市，查看未来天气。",
    "A change in weather. A world of possibilities.": "天气在变，可能无限。",
    "Made for the everyday explorer.": "为日常探索者而作。",
    "Weather data by": "天气数据来自",
    "Daylight home": "Daylight 首页",
    "Daylight — Weather, simply.": "Daylight — 简单看天气。",
    "Clear sky": "晴朗",
    "Clear night": "夜间晴朗",
    "Mainly clear": "大部晴朗",
    "Partly cloudy": "局部多云",
    "Overcast": "阴天",
    "Foggy": "有雾",
    "Drizzle": "毛毛雨",
    "Freezing drizzle": "冻毛毛雨",
    "Rain": "下雨",
    "Freezing rain": "冻雨",
    "Snow": "下雪",
    "Thunderstorms": "雷暴",
    "Conditions unavailable": "天气状况暂不可用",
    "The weather service is temporarily unavailable. Please try again.": "天气服务暂不可用，请重试。",
    "The weather service could not complete your request. Please try again.": "天气服务未能完成请求，请重试。",
    "The request took too long. Please try again.": "请求超时，请重试。",
    "Could not connect. Check your internet connection and try again.": "无法连接，请检查网络后重试。",
    "Weather data is incomplete. Please try again shortly.": "天气数据不完整，请稍后重试。",
    "No cities found. Check the spelling or try a nearby city.": "未找到城市，请检查拼写或搜索附近的城市。",
    "Choose your destination": "选择目的地",
    "Enter at least two characters to search for a city.": "请输入至少两个字符来搜索城市。",
    "Your browser does not support location detection. Search for a city instead.": "浏览器不支持定位，请搜索城市。",
    "Finding your location…": "正在获取你的位置…",
    "Loading your local weather…": "正在加载当地天气…",
    "Your location": "你的位置",
    "Location access was denied. Allow location in your browser settings or search for a city.": "定位权限被拒绝。请在浏览器设置中允许定位，或搜索城市。",
    "Your location could not be determined. Try searching for a city.": "无法确定你的位置，请搜索城市。",
    "Location detection timed out. Please try again or search for a city.": "定位超时，请重试或搜索城市。",
    "Location detection failed. Search for a city instead.": "定位失败，请搜索城市。",
    "Loading weather for {city}…": "正在加载{city}的天气…",
    "Finding {city}…": "正在搜索{city}…",
    "Weather updated for {city}.": "{city}的天气已更新。",
    "{count} matching cities found.": "找到 {count} 个匹配的城市。",
    "Local weather": "当地天气",
    " at ": " ",
    "{value}% chance of rain": "降水概率 {value}%",
    "High {high} degrees Celsius, low {low} degrees Celsius": "最高 {high} 摄氏度，最低 {low} 摄氏度",
    "Switch language": "切换语言"
  },
  "es": {
    "A little clarity for your day.": "Un poco de claridad para tu día.",
    "YOUR DAILY OUTLOOK": "TU PRONÓSTICO DIARIO",
    "Good days start": "Los buenos días empiezan",
    "with a little foresight.": "con un poco de previsión.",
    "Wherever you’re headed, know what’s ahead.": "Vayas donde vayas, prepárate para lo que viene.",
    "Find your weather": "Consulta el tiempo",
    "Search city": "Buscar ciudad",
    "Search for a city…": "Busca una ciudad…",
    "Search": "Buscar",
    "Use my location": "Usar mi ubicación",
    "Matching cities": "Ciudades coincidentes",
    "CURRENT WEATHER": "TIEMPO ACTUAL",
    "Your next destination": "Tu próximo destino",
    "Search a city to find your forecast": "Busca una ciudad para ver su pronóstico",
    "Right now": "Ahora mismo",
    "A fresh perspective, rain or shine.": "Una nueva perspectiva, llueva o haga sol.",
    "HUMIDITY": "HUMEDAD",
    "WIND SPEED": "VIENTO",
    "FEELS LIKE": "SENSACIÓN TÉRMICA",
    "Weather for wherever life takes you.": "El tiempo, dondequiera que te lleve la vida.",
    "The next 5 days": "Los próximos 5 días",
    "Your week, at a glance": "Tu semana, de un vistazo",
    "Find a city above to see what’s on the horizon.": "Busca una ciudad para ver qué tiempo viene.",
    "A change in weather. A world of possibilities.": "El tiempo cambia. Las posibilidades son infinitas.",
    "Made for the everyday explorer.": "Para quienes exploran cada día.",
    "Weather data by": "Datos meteorológicos de",
    "Daylight home": "Inicio de Daylight",
    "Daylight — Weather, simply.": "Daylight — El tiempo, sin complicaciones.",
    "Clear sky": "Despejado",
    "Clear night": "Noche despejada",
    "Mainly clear": "Mayormente despejado",
    "Partly cloudy": "Parcialmente nublado",
    "Overcast": "Cubierto",
    "Foggy": "Niebla",
    "Drizzle": "Llovizna",
    "Freezing drizzle": "Llovizna helada",
    "Rain": "Lluvia",
    "Freezing rain": "Lluvia helada",
    "Snow": "Nieve",
    "Thunderstorms": "Tormentas eléctricas",
    "Conditions unavailable": "Condiciones no disponibles",
    "The weather service is temporarily unavailable. Please try again.": "El servicio meteorológico no está disponible. Inténtalo de nuevo.",
    "The weather service could not complete your request. Please try again.": "No se pudo completar la solicitud. Inténtalo de nuevo.",
    "The request took too long. Please try again.": "La solicitud tardó demasiado. Inténtalo de nuevo.",
    "Could not connect. Check your internet connection and try again.": "No se pudo conectar. Comprueba tu conexión e inténtalo de nuevo.",
    "Weather data is incomplete. Please try again shortly.": "Los datos están incompletos. Inténtalo de nuevo en unos momentos.",
    "No cities found. Check the spelling or try a nearby city.": "No se encontraron ciudades. Revisa la ortografía o busca una ciudad cercana.",
    "Choose your destination": "Elige tu destino",
    "Enter at least two characters to search for a city.": "Introduce al menos dos caracteres para buscar una ciudad.",
    "Your browser does not support location detection. Search for a city instead.": "Tu navegador no admite la geolocalización. Busca una ciudad.",
    "Finding your location…": "Buscando tu ubicación…",
    "Loading your local weather…": "Cargando el tiempo local…",
    "Your location": "Tu ubicación",
    "Location access was denied. Allow location in your browser settings or search for a city.": "Se denegó el acceso a la ubicación. Permítelo en los ajustes del navegador o busca una ciudad.",
    "Your location could not be determined. Try searching for a city.": "No se pudo determinar tu ubicación. Busca una ciudad.",
    "Location detection timed out. Please try again or search for a city.": "La geolocalización tardó demasiado. Inténtalo de nuevo o busca una ciudad.",
    "Location detection failed. Search for a city instead.": "No se pudo obtener tu ubicación. Busca una ciudad.",
    "Loading weather for {city}…": "Cargando el tiempo de {city}…",
    "Finding {city}…": "Buscando {city}…",
    "Weather updated for {city}.": "Tiempo actualizado para {city}.",
    "{count} matching cities found.": "Se encontraron {count} ciudades coincidentes.",
    "Local weather": "Tiempo local",
    " at ": " a las ",
    "{value}% chance of rain": "{value}% de probabilidad de lluvia",
    "High {high} degrees Celsius, low {low} degrees Celsius": "Máxima de {high} grados Celsius, mínima de {low} grados Celsius",
    "Switch language": "Cambiar idioma"
  }
};
let lastWeather;
let statusState;

function t(key, values = {}) {
  const text = translations[language]?.[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? `{${name}}`);
}

// Keep original text nodes so changing language preserves icons and markup.
const staticText = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
  const node = walker.currentNode;
  const key = node.textContent.trim();
  if (translations.es[key]) staticText.push({ node, key, prefix: node.textContent.match(/^\s*/)[0], suffix: node.textContent.match(/\s*$/)[0] });
}
const staticAttributes = [];
document.querySelectorAll('[aria-label], [placeholder]').forEach((element) => {
  ['aria-label', 'placeholder'].forEach((name) => {
    const key = element.getAttribute(name);
    if (translations.es[key]) staticAttributes.push({ element, name, key });
  });
});

function applyLanguage() {
  document.documentElement.lang = language;
  document.title = t('Daylight — Weather, simply.');
  staticText.forEach(({ node, key, prefix, suffix }) => { node.textContent = prefix + t(key) + suffix; });
  staticAttributes.forEach(({ element, name, key }) => element.setAttribute(name, t(key)));
  $('language-button').textContent = `🌐 ${languageNames[language]}`;
  $('language-button').setAttribute('aria-label', `${t('Switch language')}: ${languageNames[language]}. ${languageNames[languages[(languages.indexOf(language) + 1) % languages.length]]}`);
  if (lastWeather) renderWeather(lastWeather.data, lastWeather.place);
  if (statusState) {
    const values = { ...statusState.values };
    if (statusState.key === 'Weather updated for {city}.' && lastWeather?.place.isLocation) values.city = t('Your location');
    setStatus(statusState.key, statusState.type, values);
  }
  const heading = $('results').querySelector('p');
  if (heading) heading.textContent = t('Choose your destination');
}

$('language-button').addEventListener('click', () => {
  language = languages[(languages.indexOf(language) + 1) % languages.length];
  try { localStorage.setItem('daylight-language', language); } catch { /* Optional persistence. */ }
  applyLanguage();
});

// Open-Meteo uses WMO weather interpretation codes.
function describeWeather(code, isDay = true) {
  if (code === 0) return [isDay ? 'Clear sky' : 'Clear night', isDay ? '☀️' : '🌙'];
  if (code === 1) return ['Mainly clear', isDay ? '🌤️' : '🌙'];
  if (code === 2) return ['Partly cloudy', '⛅'];
  if (code === 3) return ['Overcast', '☁️'];
  if ([45, 48].includes(code)) return ['Foggy', '🌫️'];
  if ([51, 53, 55].includes(code)) return ['Drizzle', '🌦️'];
  if ([56, 57].includes(code)) return ['Freezing drizzle', '🌨️'];
  if ([61, 63, 65, 80, 81, 82].includes(code)) return ['Rain', '🌧️'];
  if ([66, 67].includes(code)) return ['Freezing rain', '🌨️'];
  if ([71, 73, 75, 77, 85, 86].includes(code)) return ['Snow', '❄️'];
  if ([95, 96, 99].includes(code)) return ['Thunderstorms', '⛈️'];
  return ['Conditions unavailable', '🌡️'];
}

function setStatus(key, type = '', values = {}) {
  statusState = { key, type, values };
  status.textContent = t(key, values);
  status.className = `status ${type}`;
  $('weather').setAttribute('aria-busy', String(type === 'loading'));
}

// A new search cancels older work so slow responses cannot overwrite it.
function beginRequest(message, values = {}) {
  controller?.abort();
  controller = new AbortController();
  requestNumber += 1;
  $('results').hidden = true;
  setStatus(message, 'loading', values);
  return requestNumber;
}

async function fetchJSON(url) {
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error('The weather service is temporarily unavailable. Please try again.');
    const data = await response.json();
    if (data.error) throw new Error('The weather service could not complete your request. Please try again.');
    return data;
  } finally {
    clearTimeout(timeout);
  }
}

function showError(error, id) {
  if (id !== requestNumber) return;
  const message = error.name === 'AbortError'
    ? 'The request took too long. Please try again.'
    : error instanceof TypeError
      ? 'Could not connect. Check your internet connection and try again.'
      : error.message;
  setStatus(message, 'error');
}

function rounded(value) {
  return Number.isFinite(value) ? String(Math.round(value)) : '—';
}

function addText(parent, tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  parent.append(element);
  return element;
}

function renderWeather(data, place) {
  const { current, daily } = data;
  if (!current || !daily || !Array.isArray(daily.time) || daily.time.length < 6) {
    throw new Error('Weather data is incomplete. Please try again shortly.');
  }
  const [condition, icon] = describeWeather(current.weather_code, current.is_day === 1);
  lastWeather = { data, place };
  $('city-name').textContent = place.isLocation ? t('Your location') : place.name;
  $('place-detail').textContent = [place.admin1, place.country].filter(Boolean).join(', ') || `${place.latitude.toFixed(2)}°, ${place.longitude.toFixed(2)}°`;
  $('temperature').textContent = rounded(current.temperature_2m);
  $('condition').textContent = t(condition);
  $('weather-icon').textContent = icon;
  $('humidity').textContent = `${rounded(current.relative_humidity_2m)} %`;
  $('wind').textContent = `${rounded(current.wind_speed_10m)} km/h`;
  $('feels-like').textContent = `${rounded(current.apparent_temperature)} °C`;
  $('updated').textContent = `${t('Local weather')} · ${current.time.replace('T', t(' at '))} · ${data.timezone.replaceAll('_', ' ')}`;
  const fragment = document.createDocumentFragment();
  // Today is shown above; these cards cover the next five local calendar days.
  daily.time.slice(1, 6).forEach((dateString, offset) => {
    const index = offset + 1;
    const date = new Date(`${dateString}T12:00:00Z`);
    const [label, symbol] = describeWeather(daily.weather_code[index]);
    const card = document.createElement('article');
    card.className = 'forecast-day';
    addText(card, 'h3', '', date.toLocaleDateString(language, { weekday: 'long', timeZone: 'UTC' }));
    addText(card, 'p', 'forecast-date', date.toLocaleDateString(language, { month: 'short', day: 'numeric', timeZone: 'UTC' }));
    addText(card, 'div', 'forecast-icon', symbol).setAttribute('aria-hidden', 'true');
    addText(card, 'p', 'forecast-description', t(label));
    const temps = addText(card, 'p', 'forecast-temps', `${rounded(daily.temperature_2m_max[index])}°`);
    addText(temps, 'span', '', `${rounded(daily.temperature_2m_min[index])}°`);
    temps.setAttribute('aria-label', t('High {high} degrees Celsius, low {low} degrees Celsius', { high: rounded(daily.temperature_2m_max[index]), low: rounded(daily.temperature_2m_min[index]) }));
    addText(card, 'p', 'rain', `☂ ${t('{value}% chance of rain', { value: rounded(daily.precipitation_probability_max?.[index]) })}`);
    fragment.append(card);
  });
  $('forecast').replaceChildren(fragment);
}

async function loadWeather(place, id) {
  try {
    const params = new URLSearchParams({
      latitude: place.latitude, longitude: place.longitude,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
      temperature_unit: 'celsius', wind_speed_unit: 'kmh', timezone: 'auto', forecast_days: '6'
    });
    const data = await fetchJSON(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (id !== requestNumber) return;
    renderWeather(data, place);
    setStatus('Weather updated for {city}.', '', { city: place.isLocation ? t('Your location') : place.name });
  } catch (error) {
    showError(error, id);
  }
}

async function searchCity(query) {
  const id = beginRequest('Finding {city}…', { city: query });
  try {
    const params = new URLSearchParams({ name: query, count: '5', language: language === 'zh-CN' ? 'zh' : language, format: 'json' });
    const data = await fetchJSON(`https://geocoding-api.open-meteo.com/v1/search?${params}`);
    if (id !== requestNumber) return;
    if (!data.results?.length) throw new Error('No cities found. Check the spelling or try a nearby city.');
    if (data.results.length === 1) {
      setStatus('Loading weather for {city}…', 'loading', { city: data.results[0].name });
      await loadWeather(data.results[0], id);
      return;
    }
    const results = $('results');
    results.replaceChildren();
    addText(results, 'p', '', t('Choose your destination'));
    data.results.forEach((place) => {
      const button = addText(results, 'button', '', [place.name, place.admin1, place.country].filter(Boolean).join(', '));
      button.type = 'button';
      button.addEventListener('click', () => {
        const nextId = beginRequest('Loading weather for {city}…', { city: place.name });
        loadWeather(place, nextId);
      });
    });
    results.hidden = false;
    setStatus('{count} matching cities found.', '', { count: data.results.length });
  } catch (error) {
    showError(error, id);
  }
}

$('search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const query = $('city-input').value.trim();
  if (query.length < 2) {
    setStatus('Enter at least two characters to search for a city.', 'error');
    return;
  }
  searchCity(query);
});

$('location-button').addEventListener('click', () => {
  const id = beginRequest('Finding your location…');
  if (!navigator.geolocation) {
    setStatus('Your browser does not support location detection. Search for a city instead.', 'error');
    return;
  }
  navigator.geolocation.getCurrentPosition((position) => {
    if (id !== requestNumber) return;
    setStatus('Loading your local weather…', 'loading');
    // Open-Meteo has no reverse geocoder; label GPS results honestly.
    loadWeather({ name: 'Your location', isLocation: true, latitude: position.coords.latitude, longitude: position.coords.longitude }, id);
  }, (error) => {
    if (id !== requestNumber) return;
    const messages = {
      1: 'Location access was denied. Allow location in your browser settings or search for a city.',
      2: 'Your location could not be determined. Try searching for a city.',
      3: 'Location detection timed out. Please try again or search for a city.'
    };
    setStatus(messages[error.code] || 'Location detection failed. Search for a city instead.', 'error');
  }, { enableHighAccuracy: false, timeout: 12000, maximumAge: 300000 });
});

// A useful first view without requesting location permission on page load.
applyLanguage();
const initialId = beginRequest('Loading weather for {city}…', { city: 'London' });
loadWeather({ name: 'London', admin1: 'England', country: 'United Kingdom', latitude: 51.5085, longitude: -0.1257 }, initialId);
