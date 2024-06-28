import { configureStore } from '@reduxjs/toolkit';
import userReducer, { fetchUser } from './user/userSlice';
import moviesReducer, { fetchMovies, searchMovies } from './movies/moviesSlice';


export default configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { fetchUser, fetchMovies, searchMovies },
      },
    }),
});

