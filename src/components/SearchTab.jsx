import React, { useState } from "react";
import { useDispatch } from "react-redux"; 
import { addSearchHistory } from "../store"; 
import searchIcon from "../assets/search.png";
import notFoundIcon from "../assets/not-found.png";
import WeatherInfo from "./WeatherInfo";
import loadingGif from "../assets/loading.gif";

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const SearchTab = () => {
  const [state, setState] = useState({
    weatherData: null,
    loading: false,
    city: "",
    error: null,
  });

  const { weatherData, loading, city, error } = state;
  const dispatch = useDispatch(); 

  const updateState = (newState) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  const fetchWeather = async () => {
    if (!city.trim()) return; 

    updateState({ loading: true, error: null });

    try {
      const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();

      if (data.cod !== 200) throw new Error(data.message);

      updateState({ weatherData: data });

      dispatch(addSearchHistory(city));
    } catch (error) {
      updateState({ error: error.message });
      console.error("Error fetching weather:", error);
    } finally {
      updateState({ loading: false });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && city.trim() !== "") {
      fetchWeather({ q: city });
    }
  };

  return (
    <>
      <div className="searchTab2">
        <input
          type="text"
          id="searchCity"
          placeholder="Search City"
          value={city}
          onChange={(e) => updateState({ city: e.target.value })}
          onKeyDown={handleKeyDown}
        />
        <img src={searchIcon} alt="Search" id="searchIcon" onClick={fetchWeather} />
      </div>

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

export default SearchTab;
