<h1 align="center">🌦️ WEATHER CITY</h1>

<p align="center">
    Check the current weather of any city in the world in a clean, responsive interface.
</p>

<p align="center">
    <a href="https://weathercitypage.netlify.app/">🌐 Live Demo</a>
</p>

---

## 📕 About

**WEATHER CITY** is a web application that lets you search for any city and instantly see its current weather conditions. The background and ambient orbs adapt to the current weather (clear, cloudy, rain, storm, snow, mist), giving a more immersive experience.

## ✨ Features

- 🔎 Search the weather by city name (button or `Enter`)
- 🏙️ Quick-pick **popular cities** grouped by continent (Americas, Europe, Asia, Others)
- 🌡️ Real-time temperature, humidity and wind speed
- 🏳️ Country flag of the searched city
- 🌥️ Weather description with matching icon
- 🎨 Dynamic background and animated orbs based on current conditions
- ⏳ Loading and error states for clear feedback
- 📱 Responsive layout for mobile and desktop

## 🛠️ Technologies

- **HTML5**
- **CSS3** (custom properties, glassmorphism, responsive design)
- **JavaScript** (ES6+, async/await, Fetch API)
- **Google Fonts** — DM Sans & DM Serif Display

## 🔌 APIs

- [OpenWeatherMap](https://openweathermap.org/api) — weather data
- [FlagsAPI](https://flagsapi.com/) — country flags

## 🖥️ Preview

<br>
<div align="center" style="margin-top: 50px; margin-bottom: 50px;">
    <img src="images/weather1.png" alt="Weather City preview" width="400" height="600">
</div>

<br><br>

<div align="center" style="margin-top: 50px; margin-bottom: 50px;">
    <img src="images/weather2.png" alt="Weather City preview" width="400" height="400">
</div>
<br>

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Devluisgsouza/Weather_Cities.git
   ```
2. Open the project folder:
   ```bash
   cd Weather_Cities
   ```
3. Open `index.html` in your browser.

> 💡 The project uses a free OpenWeatherMap API key. To use your own, replace the `apiKey` value in `js/scripts.js`.

## 📁 Project Structure

```
Weather_Cities/
├── css/
│   └── styles.css      # Styles & responsive layout
├── js/
│   └── scripts.js      # Fetch logic, dynamic theme & interactions
├── images/             # Preview screenshots
├── public/             # Favicon / assets
└── index.html
```

## 🌐 Link

- [WEATHER CITY](https://weathercitypage.netlify.app/)

## 📄 License

This project is licensed under the [MIT License](LICENSE).
