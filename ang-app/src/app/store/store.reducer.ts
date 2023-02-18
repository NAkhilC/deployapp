import { Action, createReducer, on } from '@ngrx/store';
import { AppUser } from './AppUser.model';
import { UpdateAppUser } from './store.action';

export interface AppuserState {
  appUser: AppUser | null;
}
export const initialState: AppuserState = {
  appUser: null,
};

export const appuserReducer = createReducer(
  initialState,
  on(UpdateAppUser, (state, newAppUser) => {
    return {
      appUser: new AppUser(newAppUser.appUser),
    };
  })
);
