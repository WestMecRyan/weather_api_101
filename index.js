// Import the city data from the gridPoints json file
const gridPoints = require('./data/gridPoints.json');
console.log(gridPoints[0]['name']);
console.log(typeof gridPoints);
// Import the XMLHttpRequest emulation
const XMLHttpRequest = require('xmlhttprequest-ssl').XMLHttpRequest;
let city = gridPoints[0];
//gridPoints.forEach(function(city) {
    const xhr = new XMLHttpRequest();
  //  console.log(xhr);
    // Use template literals to insert latitude and longitude
    xhr.open("GET", `https://api.weather.gov/points/${city.lat},${city.long}`, true);
    xhr.setRequestHeader("User-Agent", "(myweatherapp.com, contact@myweatherapp.com)");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                console.log(`Data for ${city.name}:`, data);
                // save the forecast url
                const forecastUrl = data.properties.forecast;
                fetchForecastData(forecastUrl);
            } else if (xhr.status === 301 || xhr.status === 302) {
                // Handle redirect
                const newUrl = xhr.getResponseHeader('Location');
                console.log(`Redirected to: ${newUrl}`);
                // Optionally, make a new request to newUrl
            } else {
                // Log detailed error information for other statuses
                console.log(`Error fetching data for ${city.name}: Status ${xhr.status}, State ${xhr.readyState}, Text ${xhr.statusText}`);
            }
        }
    };
    xhr.send();
    function fetchForecastData(url) {
        console.log('hello', url);
        const forecastXhr = new XMLHttpRequest();
        forecastXhr.open("GET", url, true);
        forecastXhr.setRequestHeader("User-Agent", "(myweatherapp.com, contact@myweatherapp.com)");
        
        console.log("forecastXHR: ", forecastXhr);
        forecastXhr.onreadystatechange = function () {
            console.log('readystate', forecastXhr.readyState);
            if (forecastXhr.readyState === 4) {
                if (forecastXhr.status === 200) {
                    let forecastData = JSON.parse(forecastXhr.responseText);
                    console.log(`Forecast for ${city.name}:`, JSON.stringify(forecastData));
                } else {
                    console.log(`Error fetching forecast data for ${city.name}: Status ${forecastXhr.status}, State ${forecastXhr.readyState}, Text ${forecastXhr.statusText}`);
                }
            } else {
                console.log('something went wrong');
            }
        };
   }
//});
