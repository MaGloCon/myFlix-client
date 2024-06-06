import { configureStore } from '@reduxjs/toolkit';
import userReducer, { fetchUser } from './user/userSlice';
import moviesReducer, { fetchMovies } from './movies/moviesSlice';
import favoritesReducer from './favorites/favoritesSlice';


export default configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    favorites: favoritesReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { fetchUser, fetchMovies },
      },
    }),
});

