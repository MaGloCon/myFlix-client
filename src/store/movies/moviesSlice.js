import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { getState }) => {
    try {
      const { token } = getState().user;
      const response = await axios.get(`${API_URL}/movies`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data) {
        return response.data.map((movie) => ({
          id: movie._id,
          image: movie.ImagePath,
          title: movie.Title,
          titleOriginal: movie.TitleOrigin,
          description: movie.Description,
          year: movie.Year,
          countries: movie.Countries,
          genre: movie.Genre,
          director: movie.Director,
          actors: movie.Actors,
          featured: movie.Featured,
        }));
      } else {
        console.error('Movie data is not available');
        return [];
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  }
);

export const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;