import React, { useState } from "react";
import cloudIcon from "../assets/cloud.png";
import windIcon from "../assets/wind.png";
import humidityIcon from "../assets/humidity.png";
import { addBookmark,addHomeTown } from "../store"; 
import { useDispatch } from "react-redux";



const WeatherInfo = ({ weatherData }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch=useDispatch();
  
  const bookmark = (name) => {
    
    dispatch(addBookmark(name));
  };
  const homeTown = (name) =>{
    dispatch(addHomeTown(name));
  }


  return (
    <div className="displayUserData">
      <div style={{ display: "flex", alignItems: "center",flexDirection:"row",justifyContent:"space-between" }}>
        <p style={{ display: "flex", alignItems: "center",fontSize:"1.5rem" }}>{`${weatherData.name} `}
        <img
          src={`https://flagcdn.com/144x108/${weatherData?.sys?.country.toLowerCase()}.png`}
          style={{ height: "22px", marginLeft: "8px" }}
          alt="Country flag"
        />
        </p>
       
        <div
          className="three-dots"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ⋮
          {menuOpen && (
            <div className="menu-dropdown" >
              <p
                className="menu-item"
                onClick={() => {
                  bookmark(weatherData.name);
                  setMenuOpen(false);
                }}
              >
                Bookmark
              </p>
              <p
                onClick={() => {
                  homeTown(weatherData.name);
                  setMenuOpen(false);
                }}
                className="menu-item"
              >
                Set as Hometown
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Weather details */}
      <img
        src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
        alt={weatherData.weather[0].main}
        className="weather-icon"
      />
      <h3>{weatherData.weather[0].main}</h3>
      <h2>{Math.round(weatherData.main.temp)}°C</h2>

      <div className="weather-details">
        <div className="detail-item">
          <img src={windIcon} alt="wind" className="detail-icon" />
          <div>
            <p>Wind Speed</p>
            <p>{weatherData.wind.speed} m/s</p>
          </div>
        </div>
        <div className="detail-item">
          <img src={humidityIcon} alt="humidity" className="detail-icon" />
          <div>
            <p>Humidity</p>
            <p>{weatherData.main.humidity}%</p>
          </div>
        </div>
        <div className="detail-item">
          <img src={cloudIcon} alt="clouds" className="detail-icon" />
          <div>
            <p>Clouds</p>
            <p>{weatherData.clouds.all}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
