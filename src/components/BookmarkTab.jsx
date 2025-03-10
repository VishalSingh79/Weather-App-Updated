import React from "react";
import { useSelector } from "react-redux";


const HistoryTab = () => {
  const bookmarks = useSelector((state) => state.weather.bookmarks); 
 

  return (
    <div className="history-container">
      <h2>Bookmarks :</h2>
      {bookmarks.length === 0 ? (
        <p>No Bookmarks yet..</p>
      ) : (
        <ul className="history-list">
          {bookmarks.map((city, index) => (
            <li key={`${city}-${index}`} onClick={() => setSelectedCity(city)}>
              {city}
            </li>
          ))}
        </ul>
      )}
      
    </div>
  );
};

export default HistoryTab;
