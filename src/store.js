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
      if (!state.bookmarks.includes(action.payload)) {
        state.bookmarks.push(action.payload);
        localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
      }
    },
    addSearchHistory: (state, action) => {
      state.searchHistory = state.searchHistory.filter(item => item !== action.payload);
      state.searchHistory.unshift(action.payload);
      if (state.searchHistory.length > 5) {
        state.searchHistory.pop();
      }
    },

    addHomeTown: (state, action) => {
      state.homeTown = action.payload;
      localStorage.setItem('homeTown', JSON.stringify(action.payload));
    },
  },
});


export const {
  addBookmark,
  addSearchHistory,
  addHomeTown,
} = weatherSlice.actions;


const store = configureStore({
  reducer: {
    weather: weatherSlice.reducer,
  },
});

export default store;
