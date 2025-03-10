import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import notFoundIcon from "../assets/not-found.png";
import WeatherInfo from "./WeatherInfo";
import loadingGif from "../assets/loading.gif";

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;


const HomeTown = () => {
  const [state, setState] = useState({
    weatherData: null,
    loading: false,
    city: "",
    error: null,
  });

  const { weatherData, loading, city, error } = state;
  const homeCity = useSelector((state) => state.weather.homeTown); 
 

  const updateState = (newState) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  useEffect(() => {
    const fetchWeather = async () => {
        if (!homeCity.trim()) return; 
    
        updateState({ loading: true, error: null });
    
        try {
          const response = await fetch(`${BASE_URL}?q=${homeCity}&appid=${API_KEY}&units=metric`);
          const data = await response.json();
    
          if (data.cod !== 200) throw new Error(data.message);
    
          updateState({ weatherData: data });
    
        } catch (error) {
          updateState({ error: error.message });
          console.error("Error fetching weather:", error);
        } finally {
          updateState({ loading: false });
        }
      };  
    fetchWeather();
  },[])
  const fetchWeather = async () => {
    if (!homeCity.trim()) return; 

    updateState({ loading: true, error: null });

    try {
      const response = await fetch(`${BASE_URL}?q=${homeCity}&appid=${API_KEY}&units=metric`);
      const data = await response.json();

      if (data.cod !== 200) throw new Error(data.message);

      updateState({ weatherData: data });

    } catch (error) {
      updateState({ error: error.message });
      console.error("Error fetching weather:", error);
    } finally {
      updateState({ loading: false });
    }
  };

  return (
    <>
      <div id="weatherinfo">
        {loading && (
          <div className="loading-container">
            <img src={loadingGif} alt="Loading..." className="loading-gif" />
          </div>
        )}
        {error && (
            <div className="error-container">
              <img src={notFoundIcon} alt="Not Found" className="not-found-icon" />
              <h4>{`Not Found..`}</h4>
            </div>
          )}
        {weatherData && <WeatherInfo weatherData={weatherData} />}
      </div>
    </>
  );
};

export default HomeTown;
