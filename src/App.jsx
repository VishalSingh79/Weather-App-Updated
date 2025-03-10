import React, { useState } from "react";
import "./App.css";
import UserTab from "./components/UserTab";
import SearchTab from "./components/SearchTab";
import HistoryTab from "./components/HistoryTab";
import BookmarkTab from "./components/BookmarkTab";
import HomeTown from "./components/HomeTown";


const WeatherApp = () => {
  const [activeTab, setActiveTab] = useState("YOUR_WEATHER");

  return (
    <div className="wrapper">
      <h1>Weather App</h1>
      <div className="tab-container">
        <p 
          className={`tab ${activeTab === "YOUR_WEATHER" ? "current-tab" : ""}`}
          onClick={() => setActiveTab("YOUR_WEATHER")}
        >
          Your Weather
        </p>
        <p 
          className={`tab ${activeTab === "SEARCH_WEATHER" ? "current-tab" : ""}`}
          onClick={() => setActiveTab("SEARCH_WEATHER")}
        >
          Search Weather
        </p>
        <p 
          className={`tab ${activeTab === "HISTORY" ? "current-tab" : ""}`}
          onClick={() => setActiveTab("HISTORY")}
        >
          History
        </p>
        <p 
          className={`tab ${activeTab === "BOOKMARK" ? "current-tab" : ""}`}
          onClick={() => setActiveTab("BOOKMARK")}
        >
          Bookmark
        </p>
        <p 
          className={`tab ${activeTab === "HOMETOWN" ? "current-tab" : ""}`}
          onClick={() => setActiveTab("HOMETOWN")}
        >
          HomeTown
        </p>
      </div>

      <div className="weather-container">
        {activeTab === "YOUR_WEATHER" && (
          <UserTab />
        )}
        {activeTab === "SEARCH_WEATHER" && (
          <SearchTab />
        )}
        {activeTab === "HISTORY" && (
          <HistoryTab />
        )}
        {activeTab === "BOOKMARK" && (
          <BookmarkTab />
        )}
        {activeTab === "HOMETOWN" && (
          <HomeTown />
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
