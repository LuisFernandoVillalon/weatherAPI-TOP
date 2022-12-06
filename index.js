const ClearSky = 'icons/clearsky.png';
const FewClouds = 'icons/fewclouds.png';
const ScatteredClouds = 'icons/scatteredclouds.png';
const BrokenClouds = 'icons/brokenclouds.png';
const ShowerRain = 'icons/showerrain.png';
const Rain = 'icons/rain.png';
const ThunderStorm = 'icons/thunderstorm.png';
const Snow = 'icons/snow.png';
const Mist = 'icons/mist.png';

const tempBtn = document.getElementById("tempBtn");
const submitBtn = document.getElementById('btn');
const city = document.getElementById("searchCity");
const displayWeather = document.getElementById("weatherInfo");
async function submitAPI() {
    displayWeather.innerHTML = '';
    displayWeather.style.display = "flex";
    tempBtn.innerHTML = "Celcius";

    const cityData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=`+ city.value +`&APPID=c0777fc93b16abc278dfa0c88810020a`, {mode: 'cors'})
    const cityInfo = await cityData.json();
    console.log(cityInfo);

    const name = document.createElement("div");
    name.innerHTML = cityInfo.name;
    name.classList.add("cityName");
    displayWeather.appendChild(name);

    const weather = document.createElement("div");
    weather.innerHTML = "Weather: "+cityInfo.weather[0].description;
    displayWeather.appendChild(weather);
    
    const weatherIcon = document.createElement("img");
    const weatherPic = assignWeatherPic(cityInfo.weather[0].description);
    console.log(weatherPic);
    weatherIcon.setAttribute("src", weatherPic);
    displayWeather.appendChild(weatherIcon);


    const temp = document.createElement("div");
        const feelsLike = document.createElement("p");
        feelsLike.id = "feelsLike";
        feelsLike.innerHTML = "Temperature feels like: "+ KtoF(cityInfo.main.feels_like) +" F";
        temp.appendChild(feelsLike);
        const humidity = document.createElement("p");
        humidity.innerHTML = "Humidity: "+cityInfo.main.humidity+"%";
        temp.appendChild(humidity);
        const realTemp = document.createElement("p");
        realTemp.id = "realTemp";
        realTemp.innerHTML = "Temperature: "+ KtoF(cityInfo.main.temp)+" F";;
        temp.appendChild(realTemp);
        const maxTemp = document.createElement("p");
        maxTemp.id = "maxTemp";
        maxTemp.innerHTML = "Max. temperature: "+KtoF(cityInfo.main.temp_max) +" F";;
        temp.appendChild(maxTemp);
        const minTemp = document.createElement("p");
        minTemp.id = "minTemp";
        minTemp.innerHTML = "Min. temperature: "+KtoF(cityInfo.main.temp_min) +" F";;
        temp.appendChild(minTemp);
        temp.classList.add("tempContainer");
    displayWeather.appendChild(temp);

    const wind = document.createElement("div");
    wind.innerHTML = "Wind's speed: "+cityInfo.wind.speed+" mph";
    displayWeather.appendChild(wind);
    displayWeather.classList.add("styleText");
}

submitBtn.addEventListener("click", submitAPI);

function KtoF(kelvin) {
    const fahrenheit =   1.8 * (Number(kelvin) - 273) + 32;
    return Math.round(fahrenheit);
}
function FtoC(kelvin) {
    const fahrenheit =   1.8 * (Number(kelvin) - 273) + 32;
    Math.round(fahrenheit);
    const celcius = (fahrenheit - 32) * (5/9);
    return Math.round(celcius);
}
function CtoF(kelvin) {
     const celcius = kelvin - 273.15;
     Math.round(celcius);
    console.log(celcius);
    const fahrenheit = (celcius * (9/5)) + 32;
    return Math.round(fahrenheit);
}
function assignWeatherPic(weatherDescription) {
    if (weatherDescription == 'clear sky') {
        return ClearSky;
    }
    else if (weatherDescription == 'few clouds') {
        return FewClouds;
    }
    else if (weatherDescription == 'scattered clouds') {
        return ScatteredClouds;
    }
    else if (weatherDescription == 'broken clouds') {
        return BrokenClouds;
    }
    else if (weatherDescription == 'shower rain') {
        return ShowerRain;
    }
    else if (weatherDescription == 'rain') {
        return Rain;
    }
    else if (weatherDescription == 'thunderstorm') {
        return ThunderStorm;
    }
    else if (weatherDescription == 'snow') {
        return Snow;
    }
    else if (weatherDescription == 'mist') {
        return Mist;
    }
    else if (weatherDescription == 'overcast clouds') {
        return ScatteredClouds;
    }
}

tempBtn.addEventListener("click", changeTemp);

async function changeTemp() {
    const cityData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=`+ city.value +`&APPID=c0777fc93b16abc278dfa0c88810020a`, {mode: 'cors'})
    const cityInfo = await cityData.json();
    if (tempBtn.innerHTML == "Celcius") {
        tempBtn.innerHTML = "Fahrenheit";
        const feelsLike = document.getElementById("feelsLike");
        feelsLike.innerHTML = "Temperature feels like: "+ FtoC(cityInfo.main.feels_like) +" C";
        const realTemp = document.getElementById("realTemp");
        realTemp.innerHTML = "Temperature: "+ FtoC(cityInfo.main.temp) +" C";
        const maxTemp = document.getElementById("maxTemp");
        maxTemp.innerHTML = "Temperature: "+ FtoC(cityInfo.main.temp_max) +" C";
        const minTemp = document.getElementById("minTemp");
        minTemp.innerHTML = "Temperature: "+ FtoC(cityInfo.main.temp_min) +" C";
    } else if (tempBtn.innerHTML == "Fahrenheit") {
        tempBtn.innerHTML = "Celcius";
        const feelsLike = document.getElementById("feelsLike");
        feelsLike.innerHTML = "Temperature feels like: "+ CtoF(cityInfo.main.feels_like) +" F";
        const realTemp = document.getElementById("realTemp");
        realTemp.innerHTML = "Temperature: "+ CtoF(cityInfo.main.temp) +" F";
        const maxTemp = document.getElementById("maxTemp");
        maxTemp.innerHTML = "Temperature: "+ CtoF(cityInfo.main.temp_max) +" F";
        const minTemp = document.getElementById("minTemp");
        minTemp.innerHTML = "Temperature: "+ CtoF(cityInfo.main.temp_min) +" F";
    }
}