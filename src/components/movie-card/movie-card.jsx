//destructered prop - movie is the name of the prop in main-view.jsx
export const MovieCard =({movie, onMovieClick}) => {
  return(
    <div
    onClick={() =>{
      onMovieClick(movie);
    }}
    >
      {movie.Title}
    </div>
  );
};