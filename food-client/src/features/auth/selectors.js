import { AUTH_KEY } from './constants';

export const isLogged = state => state[AUTH_KEY].username.length > 0;
