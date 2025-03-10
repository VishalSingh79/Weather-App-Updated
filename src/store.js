import { configureStore, createSlice } from "@reduxjs/toolkit";

const savedHomeTown = localStorage.getItem('homeTown');
const savedBookmarks = localStorage.getItem('bookmarks');

const initialState = {
  bookmarks: savedBookmarks ? JSON.parse(savedBookmarks) : [],
  searchHistory: [],
  homeTown: savedHomeTown ? JSON.parse(savedHomeTown) : null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addBookmark: (state, action) => {
     
      if (state.bookmarks.includes(action.payload)) {
        alert('This city is already bookmarked!');
        return;
      }
      if (state.bookmarks.length >= 3) {
        alert('You can only bookmark up to 3 cities!. Remove a bookmark to add new one.');
        return;
      }
      state.bookmarks.push(action.payload);
      alert("Bookmarked successfully!!");
      localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
    },
    removeBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter(city => city !== action.payload);
      localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
    },
    addSearchHistory: (state, action) => {
      state.searchHistory = state.searchHistory.filter(item => item !== action.payload);
      state.searchHistory.unshift(action.payload);
      if (state.searchHistory.length > 5) {
        state.searchHistory.pop();
      }
    },
    removeSearchHistory: (state, action) => {
      state.searchHistory = state.searchHistory.filter(item => item !== action.payload);
    },
    addHomeTown: (state, action) => {
      state.homeTown = action.payload;
      alert('Home Town updated successfully!!');
      localStorage.setItem('homeTown', JSON.stringify(action.payload));
    },
  },
});

export const {
  addBookmark,
  removeBookmark,
  addSearchHistory,
  addHomeTown,
  removeSearchHistory
} = weatherSlice.actions;

const store = configureStore({
  reducer: {
    weather: weatherSlice.reducer,
  },
});

export default store;
