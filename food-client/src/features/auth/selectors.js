import { AUTH_KEY } from './constants';

export const selectIsLogged = state => state[AUTH_KEY].username.length > 0;
