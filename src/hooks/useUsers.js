import { useState, useEffect } from 'react';
import { API_URL } from '../config';

export const useUsers = ( token ) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;

      setIsLoading(true); 

      try {
        const response = await fetch(`${API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (data) {
          const usersFromApi = data.map((user) => ({
            id: user._id,
            username: user.Username,
            password: user.Password,
            email: user.Email,
            birthday: new Date(user.Birthday),
            favoriteMovies: user.FavoriteMovies,
          }));

          setUsers(usersFromApi);
        } else {
          console.error('User data is not available');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  return { users, isLoading };
};