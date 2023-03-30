var APIKey = "cbf81724fcd599755422dc8888dab750";
var GOOGLEKEY = "AIzaSyBaOvWcc70LEcV3x1JjDigzWfouxsb03yM"
var previousLocations = [];

// // create connections to html for placing text

// // select the dropdown area
var dropDownUl = $(`#dropdown-container`)
var previousLocationsEl = $(`#dropdown-container`)

// // grab all locations


// // main weather area
var cityImage= $(`#city-image`)
var weatherImage= $(`#weather-image`)
var weatherHeader = $(`#weather-header`)
var weatherInfo = $(`#weather-description`)
var weatherTemp= $(`#weather-temp`)
var weatherWind= $(`#weather-wind`)
var weatherHumidity= $(`#weather-humidity`)




// select the form for inputs
var formArea = $(`#location-form`)
var formInput = $(`#form-input`)
var formButton = $(`#form-btns`)
var forecastHeader =$("#forecast1-header")

// Submit event on the form

// // create text to fill those areas

// // main weather area
// // .text();
var Town = formInput.val();

var getStorage = () => {
  var storedLocations = JSON.parse(localStorage.getItem("cities"));
  if (storedLocations !== null) {
    for (let i = 0; i < storedLocations.length; i++) {
      const city = storedLocations[i];
      createCityButton(city);
    }
  }
}

formButton.on("click", function(event) {
  event.preventDefault()
  
  // forecastHeader.text(`bland farts dont rise`);
  
  console.log('First Name:');
  console.log('Last Name:', formInput.val());
  
  // formSubmit()
  var cityName = formInput.val();
  console.log(cityName)
  if (cityName) {
    if(!previousLocations.includes(cityName)) {
      previousLocations.push(cityName);
      createCityButton(cityName);
      addToStorage(previousLocations);
    }
    getWeather(cityName);
    getForecast(cityName);
    
    // formInput.val() = '';
  } else {
    alert('Please enter a city.');
}
});



var createCityButton = (city) => {
  var cityButton = $(`<button type="button" class="btn btn-primary">${city}</button>`);
  cityButton.addClass('btn');
  cityButton.attr("city-name", city);
  cityButton.text(city);
  dropDownUl.append(cityButton);
}

var addToStorage = (previousLocations) => {
  var citiesToStore = JSON.stringify(previousLocations);
  localStorage.setItem("cities", citiesToStore);
}

// // Create event handler

var getWeather = (city) => {
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
  console.log(apiURL)
  fetch(apiURL)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayData(data, location);
        console.log(data)
      });
    } else {
      alert(`Error: ${response.statusText}`);
    }
  })
  .catch(function (error) {
    alert('Unable to connect to current weather API.');
  });
}

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
    alert('Unable to connect to forecast API.');
  });
  console.log(forecastApiUrl)
};


var displayData = (weatherData, locationName) => {
  console.log(weatherData);
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  var tempKelvin = weatherData.main.temp;
  var tempFahrenheit = 1.8 * (tempKelvin - 273) + 32;
  var weatherDescriptions = weatherData.weather[0].description;
  var weatherIcon = weatherData.weather[0].icon;
  var windSpeedMPS = weatherData.wind.speed;
  var windSpeedMPH = windSpeedMPS * 2.23694;
  var humidityPercentage = weatherData.main.humidity;
  
  weatherHeader.text(`${locationName}( ${month} / ${day} / ${year} )`);
  weatherImage.attr(`src`, `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
  // weatherIcon.classList.remove("hidden");
  // weatherIcon.classList.add("show");
  weatherInfo.text(weatherData.weather.description);
  weatherTemp.text(`Temp:${tempFahrenheit.toFixed(2)} deg F`);;
weatherWind.text(`Wind:${windSpeedMPH.toFixed(2)} MPH`);
weatherHumidity.text(`Humidity:${humidityPercentage} %`);
}

var displayForecast = (forecastData) => {
  console.log(forecastData);
  var today = new Date();
  for (let i = 0; i < 5; i++) {
    for (let i = 0; i < 5; i++) { 
      idValue = i + 1
      
      
      // forecast area
      var forecastImage= $(`#forecast${idValue}-image`)
      var forecastHeader = $(`#forecast${idValue}-header`)
      var forecastDescription = $(`#forecast${idValue}-description`)
      var forecastTemp= $(`#forecast${idValue}-temp`)
      var forecastWind= $(`#forecast${idValue}-wind`)
      var forecastHumidity= $(`#forecast${idValue}-humidity`)
      // forecast area
      const forecastDay = new Date(today);
    forecastDay.setDate(forecastDay.getDate() + i + 1);
    var year = forecastDay.getFullYear();
    var month = forecastDay.getMonth();
    var day = forecastDay.getDate();
    var tempKelvin = forecastData.list[(i * 7) + 5].main.temp;
    var tempFahrenheit = 1.8 * (tempKelvin - 273) + 32;
    var forecastIcon = forecastData.list[(i * 7) + 5].weather[0].icon;
    var weatherDescription = forecastData.list[(i * 7) + 5].weather[0].description;
    var windSpeedMPS = forecastData.list[(i * 7) + 5].wind.speed;
    var windSpeedMPH = windSpeedMPS * 2.23694; 
    var humidityPercentage = forecastData.list[(i * 7) + 5].main.humidity;
      
    forecastImage.text(`<img src=http://openweathermap.org/img/wn/${forecastIcon}@2x.png>`);
      forecastHeader.text(day);
      forecastDescription.text(weatherDescription);
      forecastTemp.text(`Temp:${tempFahrenheit.toFixed(2)} deg F`);
      forecastWind.text(`Wind:${windSpeedMPH.toFixed(2)} MPH`);
      forecastHumidity.text(`Humidity:${humidityPercentage} %`);
      
      console.log(i)
      
    }
  }
};

var buttonClick = (event) => {
  var cityName = event.target.getAttribute('city-name');

  if(cityName) {
    getWeather(cityName);
    getForecast(cityName);
  }
}

previousLocationsEl.on('click', buttonClick);
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
