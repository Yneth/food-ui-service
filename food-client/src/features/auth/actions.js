import LocalStorage from 'services/localStorage';
import configureActions from 'services/configureActions';
import { STORAGE_TOKEN_KEY, STORAGE_TOKEN_EXPIRATION_DELTA } from './constants';

const configureAction = configureActions('AUTH/');

export const login = configureAction('LOG_IN', (username) => {
    const promise = Promise.resolve({ username, token: Math.random().toString(36) });

    promise.then(({ token }) => {
        const expirationDate = new Date(Date.now() + STORAGE_TOKEN_EXPIRATION_DELTA);
        LocalStorage.add(STORAGE_TOKEN_KEY, token, expirationDate);
    });

    return promise;
}).async;

export const logout = configureAction('LOG_OUT', () => {
    const token = LocalStorage.get(STORAGE_TOKEN_KEY);
    LocalStorage.remove(STORAGE_TOKEN_KEY);
    LocalStorage.remove(token);
});
