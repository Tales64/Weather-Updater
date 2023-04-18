var APIKey = "cbf81724fcd599755422dc8888dab750";
var GOOGLEKEY = "AIzaSyBaOvWcc70LEcV3x1JjDigzWfouxsb03yM";
var previousLocations = [];
var iconChoices = [
  { id: " 01d", image: "01d@2x.png" },
  { id: "01d", image: "./Assets/01n@2x.png" },
  { id: "02d", image: "./Assets/02d@2x.png" },
  { id: "02n", image: "./Assets/02n@2x.png" },
  { id: "03d", image: "./Assets/03d@2x.png" },
  { id: "03n", image: "./Assets/03n@2x.png" },
  { id: "04d", image: "./Assets/04d@2x.png" },
  { id: "04n", image: "./Assets/04n@2x.png" },
  { id: "09d", image: "./Assets/09d@2x.png" },
  { id: "09n", image: "./Assets/09n@2x.png" },
  { id: "10d", image: "./Assets/10d@2x.png" },
  { id: "10n", image: "./Assets/10n@2x.png" },
  { id: "11d", image: "./Assets/11d@2x.png" },
  { id: "11n", image: "./Assets/11n@2x.png" },
  { id: "13d", image: "./Assets/13d@2x.png" },
  { id: "50d", image: "./Assets/50d@2x.png" },
];
// // create connections to html for placing text

// // select the dropdown area
var dropDownUl = $(`#dropdown-container`);
var previousLocationsEl = $(`#dropdown-container`);

// // grab all locations

// // main weather area
var cityImage = $(`#city-image`);
var weatherImage = $(`#weather-image`);
var weatherHeader = $(`#weather-header`);
var weatherInfo = $(`#weather-description`);
var weatherTemp = $(`#weather-temp`);
var weatherWind = $(`#weather-wind`);
var weatherHumidity = $(`#weather-humidity`);

// select the form for inputs
var formArea = $(`#location-form`);
var formInput = $(`#form-input`);
var formButton = $(`#form-btns`);
var forecastHeader = $("#forecast1-header");

// Submit event on the form

// // create text to fill those areas
// // main weather area
// // .text();

var getStorage = () => {
  var storedLocations = JSON.parse(localStorage.getItem("cities"));
  if (storedLocations !== null) {
    for (let i = 0; i < storedLocations.length; i++) {
      const city = storedLocations[i];
      createCityButton(city);
    }
  }
};

formButton.on("click", function (event) {
  event.preventDefault();
  
  // forecastHeader.text(`bland farts dont rise`);
  
  console.log("First Name:");
  console.log("Last Name:", formInput.val());
  
  // formSubmit()
  var cityName = formInput.val();
  console.log(cityName);
  if (cityName) {
    if (!previousLocations.includes(cityName)) {
      previousLocations.push(cityName);
      createCityButton(cityName);
      addToStorage(previousLocations);
    }
    getWeather(cityName);
    getForecast(cityName);
    
    // formInput.val() = '';
  } else {
    alert("Please enter a city.");
  }
});

var createCityButton = (city) => {
  var cityButton = $(
    `<button type="button" class="btn btn-primary">${city}</button>`
    );
    cityButton.addClass("btn");
    cityButton.attr("city-name", city);
    cityButton.text(city);
    dropDownUl.append(cityButton);
  };
  
  var addToStorage = (previousLocations) => {
    var citiesToStore = JSON.stringify(previousLocations);
  localStorage.setItem("cities", citiesToStore);
};

// // Create event handler

var getWeather = (city) => {
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
  console.log(apiURL);
  fetch(apiURL)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayData(data, location);
        console.log(data);
      });
    } else {
      alert(`Error: ${response.statusText}`);
    }
  })
  .catch(function (error) {
    alert("Unable to connect to current weather API.");
  });
};

var getForecast = (city) => {
  // cityImage.attr( `src`, `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${city}&key=${GOOGLEKEY}`);
  var forecastApiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;
  
  fetch(forecastApiUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayForecast(data);
      });
    } else {
      alert(`Error:${response.statusText}`);
    }
  })
  .catch(function (error) {
    alert("Unable to connect to forecast API.");
  });
  console.log(forecastApiUrl);
};
var buttonClick = (event) => {
    var cityName = event.target.getAttribute("city-name");
    
    if (cityName) {
      getWeather(cityName);
      getForecast(cityName);
    }
  };
  
  var displayData = (weatherData, cityName) => {
    console.log(weatherData);
    var Town = formInput.val();
    var todaysDate = new Date();
    var year = todaysDate.getFullYear();
    var month = todaysDate.getMonth();
    var day = todaysDate.getDate();
    var tempKelvin = weatherData.main.temp;
    var tempFahrenheit = 1.8 * (tempKelvin - 273) + 32;
    var weatherDescriptions = weatherData.weather[0].description;
    var weatherIcon = weatherData.weather[0].icon;
    var windSpeedMPS = weatherData.wind.speed;
    var windSpeedMPH = windSpeedMPS * 2.23694;
    var humidityPercentage = weatherData.main.humidity;
  
    weatherHeader.text(`${Town || cityName.value}( ${month + 1} / ${day} / ${year} )`);
    console.log(cityName);
  weatherImage.attr(
    `src`,
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    );
    console.log(cityName.value);
  // weatherIcon.classList.remove("hidden");
  // weatherIcon.classList.add("show");
  weatherInfo.text(weatherData.weather.description);
  weatherTemp.text(`Temp:${tempFahrenheit.toFixed(2)} deg F`);
  weatherWind.text(`Wind:${windSpeedMPH.toFixed(2)} MPH`);
  weatherHumidity.text(`Humidity:${humidityPercentage} %`);
};

var displayForecast = (forecastData) => {
  console.log(forecastData);
  var today = new Date();

  for (let i = 0; i < 5; i++) {
    idValue = i + 1;

    // forecast area
    // var forecastImage= $(`#forecast${idValue}-image`)
    var forecastHeader = $(`#forecast${idValue}-header`);
    var forecastDescription = $(`#forecast${idValue}-description`);
    var forecastTemp = $(`#forecast${idValue}-temp`);
    var forecastWind = $(`#forecast${idValue}-wind`);
    var forecastHumidity = $(`#forecast${idValue}-humidity`);
    // forecast area
    const forecastDay = new Date(today);
    forecastDay.setDate(forecastDay.getDate() + i + 1);
    var year = forecastDay.getFullYear();
    var month = forecastDay.getMonth();
    var day = forecastDay.getDate();
    var tempKelvin = forecastData.list[idValue].main.temp;
    var tempFahrenheit = 1.8 * (tempKelvin - 273) + 32;
    var forecastIcon = forecastData.list[idValue].weather[0].icon;
    var weatherDescription = forecastData.list[idValue].weather[0].description;
    var windSpeedMPS = forecastData.list[idValue].wind.speed;
    var windSpeedMPH = windSpeedMPS * 2.23694;
    var humidityPercentage = forecastData.list[idValue].main.humidity;
    // forecastImage.text(`http://openweathermap.org/img/wn/${forecastIcon}@2x.png`);
    forecastHeader.text(day);
    forecastDescription.text(weatherDescription);
    forecastTemp.text(`Temp:${tempFahrenheit.toFixed(2)} deg F`);
    forecastWind.text(`Wind:${windSpeedMPH.toFixed(2)} MPH`);
    forecastHumidity.text(`Humidity:${humidityPercentage} %`);
    
    campFire(forecastIcon);
    // console.log(forecastImage)
  }
};
// place weather icons at the appropriate ids
function campFire(forecastIcon) {
  for (let x = 0; x < iconChoices.length; x++) {
    if (forecastIcon == iconChoices[x].id) {
      forecastIcon = iconChoices[x].image;
      var displayedIcon = forecastIcon;
      // console.log(displayData)
      $(`#forecast${idValue}-icon`).attr("src", displayedIcon);
      console.log(displayedIcon);
    }
  }
};


previousLocationsEl.on("click", buttonClick);
getStorage();
// var buttonClickHandler = (event) => {
//   var locationName = event.target.getAttribute('city-name');

//   if(locationName) {
//     getWeather(locationName);
//     getForecast(locationName);
//   }
// }

// previousLocationsEl.on('click', buttonClickHandler);
// grab api data

// // isolate api data

// // use api data in creation of weather functions

// // use api data in creation of forecast functions

// // create a way to store past searches and their weather data

// // create a way to get the local storage and turn it into a "button"
