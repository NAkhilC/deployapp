import { createSelector } from '@ngrx/store';

export const selectAppState = (state: any) => {
  return state;
};
export const getAppUser = createSelector(selectAppState, (state) => {
  return state;
});
