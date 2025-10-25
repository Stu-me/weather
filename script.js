const apiKey = "fa187dce53e57bc078688863c264bbb2";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBar = document.querySelector("#searchBar");
const searchBttn = document.querySelector("#searchBttn");
const temperature = document.querySelector(".temperature");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const icon = document.querySelector(".weather-icon");


const changeIcon = (weatherMain) => {
  const weather = weatherMain.toLowerCase(); // Normalize case

  const iconMap = {
    clear:"weather.img/sunny.png",
    rain: "weather.img/rain.png",
    snow: "weather.img/snowy.png",
    mist: "weather.img/haze.png",
    dust: "weather.img/dust.png",
    fog:  "weather.img/fog.png",
    thunderstorm: "weather.img/heavy-rain.png",
    clouds: "weather.img/clouds.png",
    haze: "weather.img/haze.png", // added because OWM uses this often
    smoke: "weather.img/smoke.png", // optional extra
  };

  // fallback icon
  icon.src = iconMap[weather] || "icons/default.png";
};

async function checkWeather(SearchedCity) {
  const response = await fetch(apiUrl + SearchedCity + `&appid=${apiKey}`); // basic api plus city name and then api key that i own
  var data = await response.json();
  console.log(data);
  city.innerHTML = data.name;
  temperature.innerHTML = data.main.temp;
  humidity.innerHTML = `${data.main.humidity} %`;
  wind.innerHTML = `${data.wind.speed} km/hr`;
  changeIcon(data.weather[0].main)
  console.log(data.weather[0].main);
  
}
checkWeather();
searchBttn.addEventListener("click", () => {
  checkWeather(searchBar.value.trim());
  console.log(searchBar.value.trim());
  
  searchBttn.style.backgroundColor = "#312f2dd0";
  searchBttn.style.outline = "3px solid #1a2980d0";
  searchBttn.style.outlineOffset = "6px";
  searchBttn.style.transition = "all 0.3s ease";

  // Add glow shadow for effect
  searchBttn.style.boxShadow = "0 0 20px #1a2980d0";

  // Reset after 400ms
  setTimeout(() => {
    searchBttn.style.backgroundColor= "white"
    searchBttn.style.outline = "none";
    searchBttn.style.outlineOffset = "0";
    searchBttn.style.boxShadow = "none";
  }, 400);
});
