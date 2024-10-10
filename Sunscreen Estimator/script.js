// script.js
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      document.getElementById("info").innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    fetchUVIndex(lat, lon);
  }
  
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        document.getElementById("info").innerHTML = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        document.getElementById("info").innerHTML = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        document.getElementById("info").innerHTML = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        document.getElementById("info").innerHTML = "An unknown error occurred.";
        break;
    }
  }
  
  function fetchUVIndex(lat, lon) {
    const apiKey = '4731461c918a7747638177adc96902e5';
    const url = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayUVIndex(data);
      })
      .catch(err => {
        console.error(err);
      });
  }
  
  function displayUVIndex(data) {
    const uvIndex = data.value;
    let advice;
  
    if (uvIndex <= 2) {
      advice = "Low UV Index: It's safe, but consider wearing sunscreen!";
    } else if (uvIndex <= 5) {
      advice = "Moderate UV Index: Apply sunscreen every 2 hours.";
    } else if (uvIndex <= 7) {
      advice = "High UV Index: Apply sunscreen every 2 hours and stay indoors during peak hours (10am-4pm).";
    } else if (uvIndex <= 10) {
      advice = "Very High UV Index: Apply sunscreen every hour and avoid sun exposure!";
    } else {
      advice = "Extreme UV Index: Avoid going outdoors and apply sunscreen frequently.";
    }
  
    document.getElementById("info").innerHTML = `
      <h2>UV Index: ${uvIndex}</h2>
      <p>${advice}</p>
    `;
  }
