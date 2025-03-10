import React, { useState, useEffect } from "react";
import locationIcon from "../assets/location.png";
import WeatherInfo from "./WeatherInfo";
import loadingGif from "../assets/loading.gif";

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;


const UserTab = () => {
  const [state, setState] = useState({
    weatherData: null,
    loading: false,
    locationAccess: false,
    error: null
  });

  const { weatherData, loading, locationAccess } = state;

  const updateState = (newState) => {
    setState(prev => ({ ...prev, ...newState }));
  };

  const fetchWeather = async (params) => {
    updateState({ loading: true, error: null });
    try {
      const queryParams = new URLSearchParams({
        ...params,
        appid: API_KEY,
        units: 'metric'
      });
      
      const response = await fetch(`${BASE_URL}?${queryParams}`);
      const data = await response.json();
      
      if (data.cod && data.cod !== 200) {
        throw new Error(data.message);
      }
      
      updateState({ weatherData: data });
    } catch (error) {
      updateState({ error: error.message });
      console.error("Error fetching weather:", error);
    } finally {
      updateState({ loading: false });
    }
  };

  const handleLocationAccess = () => {
    if (!navigator.geolocation) {
      updateState({ error: "Geolocation is not supported by this browser." });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        sessionStorage.setItem("lat", lat);
        sessionStorage.setItem("lon", lon);
        updateState({ locationAccess: false });
        fetchWeather({ lat, lon });
      },
      () => updateState({ error: "Location access denied" })
    );
  };

  useEffect(() => {
    const lat = sessionStorage.getItem("lat");
    const lon = sessionStorage.getItem("lon");
    
    if (lat && lon) {
      fetchWeather({ lat, lon });
    } else {
      updateState({ locationAccess: true });
    }
  }, []);

  return (
    <div id="weatherinfo">
      {loading && (
        <div className="loading-container">
          <p><img src={loadingGif} alt="Loading..." className="loading-gif" /></p>
          <p>Loading..</p>
        </div>
      )}
      
      {state.error && (
        <div className="error-container">
          <p>{state.error}</p>
        </div>
      )}
      
      {locationAccess && (
        <div className="userlocation">
          <img src={locationIcon} alt="location" className="location-icon" />
          <h5
          style={{
            margin:"0rem"
          }}
          >GRANT LOCATION ACCESS</h5>
          <p style={{
            fontSize:"12px"
          }}>Allow Access to Get the Weather Information</p>
          <button id="grantaccess" onClick={handleLocationAccess}>
            GRANT ACCESS
          </button>
        </div>
      )}
      {weatherData && <WeatherInfo weatherData={weatherData} />}
    </div>
  );
};

export default UserTab; 