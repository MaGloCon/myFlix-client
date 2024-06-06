export const selectMovies = (state) => state.movies.movies;
export const selectIsLoading = (state) => state.movies.status === 'loading';
export const selectError = (state) => state.movies.error;