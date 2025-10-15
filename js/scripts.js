const apiKey = "4e950c27362cf440e08f300359e7838b";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

// Função para mudar o background (fora de outras funções)
function changeBackground(main, description) {
  const body = document.body;
  body.style.transition = "background 2s ease-in-out";

  // normalize strings pra comparação
  const m = (main || "").toLowerCase();
  const d = (description || "").toLowerCase();

    if (m.includes("clear") || d.includes("céu limpo") || d.includes("limpo")) {
        body.style.background = "linear-gradient(180deg, rgb(0, 160, 255) 0%, rgb(0, 80, 150) 70%)";
    } 
    else if (m.includes("cloud") || d.includes("nublado") || d.includes("nuvem") || d.includes("cloud")) {
        body.style.background = "linear-gradient(180deg, rgb(100, 120, 140) 0%, rgb(40, 60, 80) 70%)";
    } 
    else if (m.includes("rain") || d.includes("chuva") || d.includes("drizzle")) {
        body.style.background = "linear-gradient(180deg, rgb(40, 60, 90) 0%, rgb(20, 30, 50) 70%)";
    } 
    else if (m.includes("thunder") || m.includes("storm") || d.includes("tempestade") || d.includes("trovoada")) {
        body.style.background = "linear-gradient(180deg, rgb(60, 60, 80) 0%, rgb(15, 15, 30) 70%)";
    } 
    else if (m.includes("snow") || d.includes("neve")) {
        body.style.background = "linear-gradient(180deg, rgb(200, 230, 255) 0%, rgb(150, 180, 200) 70%)";
    } 
    else if (m.includes("mist") || m.includes("fog") || d.includes("névoa") || d.includes("neblina") || d.includes("fog")) {
        body.style.background = "linear-gradient(180deg, rgb(150, 160, 170) 0%, rgb(90, 100, 110) 70%)";
    } 
    else {
        body.style.background = "linear-gradient(180deg, rgb(13, 98, 138) 0%, rgb(20, 38, 63) 70%)";
    }
}

// Função para buscar dados da API (fechada corretamente)
const getWeatherData = async (city) => {
  try {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);

    if (!res.ok) {
      // trata erro (cidade não encontrada, etc)
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Erro na requisição: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("getWeatherData error:", error);
    return null;
  }
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);
  if (!data) {
    alert("Não foi possível obter os dados do clima. Verifique o nome da cidade e tente novamente.");
    return;
  }

  cityElement.innerText = data.name || "";
  tempElement.innerText = data.main ? parseInt(data.main.temp) : "";
  descElement.innerText = data.weather && data.weather[0] ? data.weather[0].description : "";
  weatherIconElement.setAttribute("src", data.weather && data.weather[0] ? `http://openweathermap.org/img/wn/${data.weather[0].icon}.png` : "");
  countryElement.setAttribute("src", data.sys && data.sys.country ? `https://flagsapi.com/${data.sys.country}/shiny/64.png` : "");
  humidityElement.innerText = data.main ? `${data.main.humidity}%` : "";
  windElement.innerText = data.wind ? `${data.wind.speed} km/h` : "";

  // chama a função para mudar o background — envio tanto main quanto description
  const main = data.weather && data.weather[0] ? data.weather[0].main : "";
  const description = data.weather && data.weather[0] ? data.weather[0].description : "";
  changeBackground(main, description);

  weatherContainer.classList.remove("hide");
};

// Eventos
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value.trim();
    if (city) showWeatherData(city);
  }
});
