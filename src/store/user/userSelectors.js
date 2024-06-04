import { createSelector } from '@reduxjs/toolkit';

const selectUserState = state => state.user;

export const selectUser = createSelector(
  [selectUserState],
  (userState) => userState.user
);

export const selectToken = createSelector(
  [selectUserState],
  (userState) => userState.token
);

export const selectError = createSelector(
  [selectUserState],
  (userState) => userState.error
);