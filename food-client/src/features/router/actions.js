import configureActions from 'services/configureActions';

const configureAction = configureActions('ROUTER/');

export const setRoute = configureAction('SET_ROUTE', (path, matches) => ({ path, matches }));

export const replaceTo = configureAction('REPLACE_TO', path => ({ path }));

export const navigate = configureAction('NAVIGATE', path => ({ path }));

export const go = configureAction('GO', n => ({ n }));
