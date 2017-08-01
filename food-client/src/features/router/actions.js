import configureActions from 'services/configureActions';
import router from './router';

const configureAction = configureActions('ROUTER/');

export const changeRoute = configureAction('CHANGE_ROUTE', (path, matches) => ({ path, matches }));

export const navigate = configureAction('NAVIGATE', (path) => {
    router().navigate(path);
    return { path };
});

export const go = configureAction('GO', (n) => {
    router().go(n);
    return { n };
});
