var APIKey = "cbf81724fcd599755422dc8888dab750";


// create connections to html for placing text

// select the dropdown area
var dropDownUL= $(`#dropdown-container`)


// grab all locations

// main weather area
var weatherImage= $(`#weather-image`)
var weatherHeader = $(`#weather-header`)
var weatherDescription = $(`#weather-description`)
var weatherTemp= $(`#weather-temp`)
var weatherWind= $(`#weather-wind`)
var weatherHumidity= $(`#weather-humidity`)




// select the form for inputs
var formArea= $(`#location-form`)
var formInput= $(`#form-input`)
var formButton= $(`#form-btns`)


// create text to fill those areas

// main weather area
.text();
weatherHeader.text(`eat my shorts`);
weatherDescription.text(`i like pie`);
weatherTemp.text(`i like pie`);
weatherWind.text(`i like pie`);
weatherHumidity.text(`i like pie`);

var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;

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
  // .text();
  forecastHeader.text(`bland farts dont rise`);
  forecastDescription.text(`bland farts dont rise`);
  forecastTemp.text(`bland farts dont rise`);
  forecastWind.text(`bland farts dont rise`);
  forecastHumidity.text(`bland farts dont rise`);

  console.log(i)
}








// grab api data

// isolate api data

// use api data in creation of weather functions

// use api data in creation of forecast functions

// create a way to store past searches and their weather data

// create a way to get the local storage and turn it into a "button"