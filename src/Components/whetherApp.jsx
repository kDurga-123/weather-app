import React, { useState } from "react";
import './whetherApp.css';

export function WhetherApp() {
    const [weatherData, setWeatherData] = useState({
        humidity: '',
        windSpeed: '',
        temperature: '',
        location: ''
    });
    const [icon, setIcon] = useState(null);
    const [error, setError] = useState(null);
    const apiKey = "5d0d48fefa6eb77b6e535a3ba38c5b01";

    const searchWeather = async () => {
        const inputColumn = document.querySelector(".input");
        if (!inputColumn.value.trim()) {
            setError("Please Enter Data");
            return;
        }
        let time = performance.now();
        try {
            setError(null);
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputColumn.value}&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            setWeatherData({
                humidity: Math.floor(data.main.humidity),
                windSpeed: Math.floor(data.wind.speed),
                temperature: Math.round(data.main.temp),
                location: data.name
            });
            let time2 = performance.now();
            let a = time2 - time;
            console.log(a);

            if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
                setIcon(<img className="icon" src="./Resources/clear.png" alt="Clear Icon" />);
            }
            else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
                setIcon(<img className="icon"  src="./Resources/cloud.png" alt="Cloud Icon" />);
            }
            else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
                setIcon(<img className="icon"  src="./Resources/drizzle.png" alt="Drizzle Icon" />);
            }
            else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
                setIcon(<img className="icon" src="./Resources/rain.png" alt="Rain Icon" />);
            }
            else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
                setIcon(<img className="icon"  src="./Resources/rain.png" alt="Rain Icon" />);
            }
            else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
                setIcon(<img className="icon"  src="./Resources/rain.png" alt="Rain Icon" />);
            }
            else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
                setIcon(<img className="icon"  src="./Resources/snow.png" alt="Snow Icon" />);
            }
            else {
                setIcon(<img  className="icon" src="./Resources/default.png" alt="Default Icon" />);
            }

        } catch (error) {
            console.error(error);
            setError("Invalid Data"); 
        }
        inputColumn.value = "";
    };

    return (
        <>
            <div className="container">
                <div className="input-box">
                    <input type='text' placeholder="search...." className="input" />
                    <div className="search-button" onClick={searchWeather}>
                        <img src='./Resources/search.png' alt="Search Button" />
                    </div>
                </div>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                {weatherData.location && !error && (
                    <div className="cloud-image">
                        {icon && (
                            <div className="weather-icon">
                                {icon}
                            </div>
                        )}
                        <div className="temperature">{weatherData.temperature}° C</div>
                        <div className="location">{weatherData.location}</div>
                        <div className="all-data">
                            <div className="humidity">
                                <img src="./Resources/humidity.png" alt="Humidity Icon" />
                                <div>
                                    <div>{weatherData.humidity}%</div>
                                    <div>humidity</div>
                                </div>
                            </div>
                            <div className="wind">
                                <img src="./Resources/wind.png" alt="Wind Icon" />
                                <div>
                                    <div>{weatherData.windSpeed} km/hour</div>
                                    <div>wind speed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}




