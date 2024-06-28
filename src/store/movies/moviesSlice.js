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

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async ( title, { getState }) => {
    const { token } = getState().user;
    // const queryParameters = new URLSearchParams();

    // const apiSearchableFields = {
    //   Title: 'Title',
    //   Year: 'Year',
    //   Countries: 'Countries',
    //   Languages: 'Languages', 
    //   Genre: 'Genre.Name',
    //   Director: 'Director.Name',
    //   Actors: 'Actors.Name', 
    // };

    // Object.keys(searchParams).forEach((key) => {
    //   if (key in apiSearchableFields) {
    //     queryParameters.append(apiSearchableFields[key], searchParams[key]);
    //   }
    // });

    // if (searchParams.decade) {
    //   const startYear = searchParams.decade.substring(0, 4); // Extract start year from decade
    //   const endYear = (parseInt(startYear) + 9).toString(); // Calculate end year of the decade
    //   queryParameters.append('Year[gte]', startYear);
    //   queryParameters.append('Year[lte]', endYear);
    // }

    const response = await axios.get(`${API_URL}/movies/search?Title=${title}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.map((movie) => ({
      id: movie._id,
      image: movie.ImagePath,
      title: movie.Title,
      titleOriginal: movie.TitleOrigin,
      description: movie.Description,
      year: movie.Year,
      countries: movie.Countries,
      genre: movie.Genre ? movie.Genre.Name : undefined,
      director: movie.Director ? movie.Director.Name : undefined,
      actors: movie.Actors,
      featured: movie.Featured,
      // Map additional fields as necessary
    }));
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
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      });
  },
});

export default movieSlice.reducer;