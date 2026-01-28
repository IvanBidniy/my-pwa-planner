import './style.css';

// ------------------ Clock ------------------
function updateClock() {
  const clockElement = document.getElementById('clock');
  if (clockElement) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  }
}

// ------------------ Weather ------------------
function fetchWeather() {
  const weatherElement = document.getElementById('weather');
  if (weatherElement) {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52&current_weather=true';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const temp = data.current_weather.temperature;
        weatherElement.textContent = `Погода у Києві: ${temp}°C`;
      })
      .catch(error => {
        console.error('Error fetching weather:', error);
        weatherElement.textContent = 'Не вдалося завантажити погоду';
      });
  }
}

// ------------------ Calendar ------------------
const calendarEvents = [
  { time: '10:00', title: 'Зустріч з командою' },
  { time: '12:30', title: 'Обід' },
  { time: '15:00', title: 'Дзвінок з клієнтом' },
  { time: '17:00', title: 'Робота над проектом' },
];

function renderCalendar() {
  const calendarElement = document.getElementById('calendar');
  if (calendarElement) {
    const ul = document.createElement('ul');
    calendarEvents.forEach(event => {
      const li = document.createElement('li');
      li.textContent = `${event.time} - ${event.title}`;
      ul.appendChild(li);
    });
    calendarElement.appendChild(ul);
  }
}

// ------------------ Google Apps Script Integration ------------------
/*
// Example of a Google Apps Script function to be deployed as a web app
function doGet(e) {
  const data = [
    { time: '09:00', title: 'Check emails' },
    { time: '11:00', title: 'Project sync' },
  ];
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
*/

function fetchFromGAS() {
  const gasWebAppUrl = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
  if (gasWebAppUrl === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
    console.warn('Please replace "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL" with your actual Google Apps Script web app URL.');
    return;
  }
  fetch(gasWebAppUrl)
    .then(response => response.json())
    .then(data => {
      console.log('Data from GAS:', data);
      // Here you would update your calendar or other elements with the fetched data
    })
    .catch(error => {
      console.error('Error fetching from GAS:', error);
    });
}

// ------------------ Initial Load ------------------
document.addEventListener('DOMContentLoaded', () => {
  // Initial calls
  updateClock();
  fetchWeather();
  renderCalendar();

  // Set intervals
  setInterval(updateClock, 1000);

  // Register service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
});
