const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c'; // Replace with your own API key

$(document).ready(function() {
    // Fetch weather data for the default city on page load
    weatherFn('Chennai');   

    // Event listener for the button click
    $('#fetch-weather-btn').on('click', function() {
        const cityName = $('#city-input').val().trim(); // Get the value from the input
        if (cityName) { // Check if the input is not empty
            weatherFn(cityName); // Fetch weather data for the entered city
        } else {
            alert('Please enter a city name.'); // Alert if input is empty
        }
    });
});

async function weatherFn(cityName) {
    const endpoint = `${url}?q=${cityName}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        
        if (response.ok) {
            weatherShowFn(data);
        } else {
            // Display error message to the user
            $('#weather-info').html('<p>City not found. Please try again.</p>').fadeIn();
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        $('#weather-info').html('<p>An error occurred while fetching weather data. Please try again later.</p>').fadeIn();
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, hh:mm a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    
    // Display the weather icon
    const iconCode = data.weather[0].icon; // Get the icon code
    $('#weather-info').append(`<img id="weather-icon" src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon">`);
    
    // Fade in the weather information
    $('#weather-info').fadeIn();
}

