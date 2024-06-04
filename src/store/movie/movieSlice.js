import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../utils/constants';

// Async thunk for fetching movies
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { getState }) => {
    const token = getState().user.token; // Get the token from the Redux store
    if (!token) return;

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
      throw new Error('Movie data is not available');
    }
  }
);

// Slice for movies
const moviesSlice = createSlice({
  name: 'movies',
  initialState: { list: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;