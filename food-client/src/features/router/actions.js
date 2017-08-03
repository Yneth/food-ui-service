import configureActions from 'services/configureActions';
import Router from './router';

const configureAction = configureActions('ROUTER/');

export const setRoute = configureAction('SET_ROUTE', (path, matches) => ({ path, matches }));

export const navigate = configureAction('NAVIGATE', (path) => {
    Router.instance.navigate(path);
    return { path };
});

export const go = configureAction('GO', (n) => {
    Router.instance.go(n);
    return { n };
});
