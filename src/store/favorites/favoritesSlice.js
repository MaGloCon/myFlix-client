// favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavoriteMovie: (state, action) => {
      state.push(action.payload);
    },
    deleteFavoriteMovie: (state, action) => {
      return state.filter(movie => movie.id !== action.payload);
    },
  },
});

export const { addFavoriteMovie, deleteFavoriteMovie } = favoritesSlice.actions;

export default favoritesSlice.reducer;