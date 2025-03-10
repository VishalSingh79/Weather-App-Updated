import React from "react";
import { useSelector } from "react-redux";

const HistoryTab = () => {
  const searchHistory = useSelector((state) => state.weather.searchHistory);
  return (
    <div className="history-container">
      <h2>Recent Searches</h2>
      {searchHistory.length === 0 ? (
        <p>No recent searches</p>
      ) : (
        <ul className="history-list">
          {searchHistory.map((city, index) => (
            <li key={`${city}-${index}`} >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryTab;
