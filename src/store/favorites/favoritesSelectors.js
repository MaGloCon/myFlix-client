// favoriteSelectors.js
import { createSelector } from '@reduxjs/toolkit';

const selectFavorites = state => state.favorites;

export const selectFavoriteMovies = createSelector(
  [selectFavorites],
  (favorites) => favorites
);