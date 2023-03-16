var APIKey = "5bdf324775e0896ec3053c8ff5073cc3";
var locationInput = $('#root').value;
var locationButtonEl = $('#cats')
var locationListOl = [];
// Create a for loop that appends weather to apropriate areas

// Create a way to append forcast to the proper area

// Create a way to save to local storage

// Create a way to add old saved locations to the page

// Create 
// Create 
getWeather: () => {
var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${APIKey}`;
fetch(apiURL)
.then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayData(data, city);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  })
  .catch(function (error) {
    alert('Unable to connect to current weather API.');
  });
}


getForcast: ()=>{
    var forecastApiUrl = (`http://api.openweathermap.org/data/2.5/forecast?p=${locationInput}&appid=${APIKey}`)

    fetch(forecastApiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayForecast(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to forecast API.');
    });
  }




locationButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(event);
    console.log(locationInput)
    console.log(weatherLocation)
    console.log(apiURL)

});














// Comments show the vanilla JavaScript equivalent statements

// var rootEl = document.getElementById("root");
var rootEl = $('#root');

// var titleEl = document.createElement("h1");
var titleEl = $('<h1>');

// titleEl.textContent = "Hello friends";
titleEl.text('Hello friends');

// titleEl.className = 'fancy';
titleEl.attr('class', 'fancy');

// titleEl.classList.add('p-5') - (`p-5` is for padding)
titleEl.addClass('p-5');

// titleEl.style.border = "rgb(122, 242, 242) 3px solid";
titleEl.css('border', 'rgb(122, 242, 242) 5px solid');

// rootEl.appendChild(titleEl);
rootEl.append(titleEl);

// titleEl.append("Welcome to jQuery");
rootEl.append('<h2>With jQuery we can:</h2>');