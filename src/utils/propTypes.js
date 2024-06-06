import PropTypes from 'prop-types';

export const tokenPropType = PropTypes.string.isRequired;

export const userPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  Username: PropTypes.string.isRequired,
  Password: PropTypes.string.isRequired,
  Email: PropTypes.string.isRequired,
  Birthday: PropTypes.string.isRequired,
  FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
}).isRequired;

export const moviePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  titleOriginal: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  countries: PropTypes.arrayOf(PropTypes.string).isRequired,
  genre: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  director: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      bio: PropTypes.string,
      birth: PropTypes.string,
      death: PropTypes.string,
    })
  ).isRequired,
  actors: PropTypes.arrayOf(PropTypes.string),
});


