import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { removeBookmark } from "../store";


const HistoryTab = () => {
  const bookmarks = useSelector((state) => state.weather.bookmarks); 
  const dispatch = useDispatch();

  const handleRemoveCity = (city) => {
    dispatch(removeBookmark(city));
  };

  return (
    <div className="history-container">
      <h2>Bookmarks :</h2>
      {bookmarks.length === 0 ? (
        <p>No Bookmarks yet..</p>
      ) : (
        <ul className="history-list">
          {bookmarks.map((city, index) => (
            <li key={`${city}-${index}`} className="history-item">
              <p style={{fontSize:"22px"}}>{city}</p>
              <button 
                onClick={() => handleRemoveCity(city)}
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
