import configureActions from 'services/configureActions';

const configureAction = configureActions('AUTH/');

export const login = configureAction('LOG_IN', username => (
    Promise.resolve({ username, token: Math.random().toString(36) })
)).async;

export const logout = configureAction('LOG_OUT', username => ({ username }));
