import { configureStore } from '@reduxjs/toolkit';
import userReducer, { fetchUser } from './user/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { fetchUser },
      },
    }),
});