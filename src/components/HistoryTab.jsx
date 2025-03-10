import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeSearchHistory } from "../store"; // Make sure this path is correct

const HistoryTab = () => {
  const dispatch = useDispatch();
  const searchHistory = useSelector((state) => state.weather.searchHistory);

  const handleRemove = (city) => {
    dispatch(removeSearchHistory(city));
  };

  return (
    <div className="history-container">
      <h2>Recent Searches</h2>
      {searchHistory.length === 0 ? (
        <p>No recent searches</p>
      ) : (
        <ul className="history-list">
          {searchHistory.map((city, index) => (
            <li key={`${city}-${index}`} className="history-item">
              <p style={{fontSize:"22px"}}>{city}</p>
              <button 
                onClick={() => handleRemove(city)}
                className="remove-btn"
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryTab;
