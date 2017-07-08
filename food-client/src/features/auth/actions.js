import configureActions from 'services/configureActions';

const configureAction = configureActions('AUTH/');

export const login = configureAction('LOG_IN', (username, token) => (
    { username, token }
));

export const logout = configureAction('LOG_OUT', username => ({ username }));
