
// CURRENT AND 3-DAY WEATHER FORECAST
//variables
const latitude = '34.58';
const longitude = '136.52';
const apiKey = 'a44cb97f9caa00ac7b9a9561a8379fe8';
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
const currentWeatherDisplay = document.querySelector('.weather-info');
const forecastDisplay = document.querySelector('.forecast-info');


async function weatherApiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
    //   console.log(data.list)
      return data.list
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}


weatherApiFetch().then((data) => {
  displayCurrentWeather(data, currentWeatherDisplay);
  displayForecast(data, forecastDisplay)
})

function displayCurrentWeather(data, elementCon){
    elementCon.innerHTML = '';
    const info = `
        <img src="https://openweathermap.org/img/wn/${data[0].weather[0].icon}@2x.png" alt="${data[0].weather[0].description}" class="weatherIcon">
        <div>
            <p class="temp">${data[0].main.temp}°C</p>
            <p class="weather-desc">${data[0].weather[0].description}</p>
            <p class="high">High: ${Math.round(data[0].main.temp_max)}°C</p>
            <p class="low">Low: ${Math.round(data[0].main.temp_min)}°C</p>
            <p class="humidity">Humidity: ${data[0].main.humidity}</p>
        </div>`;
    elementCon.innerHTML = info;
}

function displayForecast(data, elementCon){
    const forecastList = data.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
    elementCon.innerHTML = '';
    const forecastHTML = forecastList.map(day => {
      const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
      return `<li><p class="day">${date}:<span class="forecast-temp">${day.main.temp}°C</span></p></li>`;
    }).join('');
    elementCon.innerHTML += forecastHTML;
}


// BUSINESS SPOTLIGHT
const businessCon = document.querySelector('.businesses');
const membersUrl = 'data/members.json';

async function getBusinessData() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.members;
    }
    catch(error) {
        console.error("Error fetching business data:", error);
    }

}

getBusinessData().then((members) => {
    const qualified = members.filter(member =>
      member.membership === 'Gold' || member.membership === 'Silver'
    );
    const shuffled = qualified.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
  displayBusinessCards(selected, businessCon);
})


function displayBusinessCards(memberList,elementCon) {
    elementCon.innerHTML = "";
    memberList.forEach((member) => {
        const memberCards = `<div class="bcard">
                <div class="bname">
                    <h3 class="b-name">${member.name}</h3>
                    <span class="mem-level">${member.membership}</span>
                </div>
                <div class="mem-info">
                    <img src="images/${member.image}" alt="${member.name}">
                    <div class="mem-details">
                        <ul>
                            <li><span class="info-label">Address:</span><span class="mem-email">${ member.address}</span></li>
                            <li><span class="info-label">Phone:</span><span class="mem-phone">${ member.number}</span></li>
                            <li><span class="info-label">URL:</span><a href="${member.website}" class="mem-url">${ member.name}</a></li>
                        </ul>
                    </div>
                </div>
                
            </div>`;
        elementCon.innerHTML += memberCards;
    });
}

