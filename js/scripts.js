const apiKey = "4e950c27362cf440e08f300359e7838b";

// Elementos da interface
const cityInput    = document.getElementById("city-input");
const searchBtn    = document.getElementById("search");
const cityEl       = document.getElementById("city");
const tempEl       = document.getElementById("temperature-val");
const descEl       = document.getElementById("description");
const iconEl       = document.getElementById("weather-icon");
const countryEl    = document.getElementById("country");
const humidityEl   = document.getElementById("humidity");
const windEl       = document.getElementById("wind");
const weatherCard  = document.getElementById("weather-data");
const loadingEl    = document.getElementById("loading");
const errorEl      = document.getElementById("error-msg");

// Mapa de temas por condição climática
const bgMap = {
  clear:   {
    orb1: "#1565c0",
    orb2: "#0288d1",
    body: "linear-gradient(135deg, #0d1b3e 0%, #0a2a5c 50%, #071a3e 100%)",
    solid: "#0a2a5c"
  },
  cloud:   {
    orb1: "#37474f",
    orb2: "#546e7a",
    body: "linear-gradient(135deg, #1a1f2e 0%, #263238 50%, #1a1f2e 100%)",
    solid: "#263238"
  },
  rain:    {
    orb1: "#1a237e",
    orb2: "#283593",
    body: "linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 50%, #0a0f1e 100%)",
    solid: "#0d1b3e"
  },
  storm:   {
    orb1: "#1a0033",
    orb2: "#4a148c",
    body: "linear-gradient(135deg, #050510 0%, #0f0520 50%, #050510 100%)",
    solid: "#0f0520"
  },
  snow:    {
    orb1: "#4fc3f7",
    orb2: "#b3e5fc",
    body: "linear-gradient(135deg, #1a2a3a 0%, #1e3a4a 50%, #1a2a3a 100%)",
    solid: "#1e3a4a"
  },
  mist:    {
    orb1: "#455a64",
    orb2: "#607d8b",
    body: "linear-gradient(135deg, #1a1f26 0%, #243040 50%, #1a1f26 100%)",
    solid: "#243040"
  },
  default: {
    orb1: "#1565c0",
    orb2: "#0288d1",
    body: "linear-gradient(135deg, #0a0f1e 0%, #0d1829 50%, #0a0f1e 100%)",
    solid: "#0a0f1e"
  }
};

// Meta usada para colorir a barra do navegador conforme o clima
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

// Atualiza background e orbs conforme condição climática
function updateBackground(main) {
  const m = (main || "").toLowerCase();
  let theme = "default";

  if (m.includes("clear"))                          theme = "clear";
  else if (m.includes("cloud"))                     theme = "cloud";
  else if (m.includes("rain") || m.includes("drizzle")) theme = "rain";
  else if (m.includes("thunder") || m.includes("storm")) theme = "storm";
  else if (m.includes("snow"))                      theme = "snow";
  else if (m.includes("mist") || m.includes("fog")) theme = "mist";

  const t = bgMap[theme];

  // Fundo do body (gradiente do clima)
  document.body.style.transition = "background 2.5s ease";
  document.body.style.background = t.body;

  // Fundo do projeto (html) acompanha o clima — cobre overscroll e áreas fora do body
  document.documentElement.style.transition = "background 2.5s ease";
  document.documentElement.style.background = t.solid;

  // Barra do navegador (PWA / mobile) acompanha o clima
  if (themeColorMeta) themeColorMeta.setAttribute("content", t.solid);

  document.querySelector(".orb1").style.background = `radial-gradient(circle, ${t.orb1}, transparent)`;
  document.querySelector(".orb2").style.background = `radial-gradient(circle, ${t.orb2}, transparent)`;
}

// Controla estado de loading
function setLoading(active) {
  loadingEl.classList.toggle("show", active);
  errorEl.classList.remove("show");
  if (active) weatherCard.classList.remove("visible");
}

// Busca e exibe dados do clima
async function fetchWeather(city) {
  setLoading(true);

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Erro ${res.status}`);

    const d = await res.json();

    cityEl.textContent      = d.name || "";
    tempEl.textContent      = d.main ? Math.round(d.main.temp) : "";
    descEl.textContent      = d.weather?.[0]?.description || "";
    humidityEl.textContent  = d.main ? `${d.main.humidity}%` : "";
    windEl.textContent      = d.wind ? `${Math.round(d.wind.speed)} km/h` : "";

    iconEl.src    = d.weather?.[0]?.icon
      ? `https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`
      : "";

    countryEl.src = d.sys?.country
      ? `https://flagsapi.com/${d.sys.country}/shiny/64.png`
      : "";

    updateBackground(d.weather?.[0]?.main || "");

    setLoading(false);
    weatherCard.classList.add("visible");

  } catch (err) {
    console.error("Erro ao buscar clima:", err);
    setLoading(false);
    errorEl.classList.add("show");
  }
}

// =====================
// ABAS DE CONTINENTES
// =====================
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const continent = btn.dataset.continent;

    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".continent-group").forEach(g => g.classList.remove("active"));
    document.querySelector(`.continent-group[data-continent="${continent}"]`).classList.add("active");
  });
});

// =====================
// CHIPS DE CIDADES
// =====================
document.querySelectorAll(".city-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    const city = chip.dataset.city;

    document.querySelectorAll(".city-chip").forEach(c => c.classList.remove("selected"));
    chip.classList.add("selected");

    cityInput.value = chip.textContent.replace(/^\S+\s/, ""); // Remove emoji, preenche input
    fetchWeather(city);
  });
});

// Eventos
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const city = e.target.value.trim();
    if (city) fetchWeather(city);
  }
});