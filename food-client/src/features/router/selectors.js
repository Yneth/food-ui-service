import { ROUTER_KEY } from './constants';

export const selectRouterData = state => state[ROUTER_KEY];

export const selectMatch = (state, name) => {
    const matches = selectRouterData(state).matches;
    return matches ? matches[name] : null;
};

export const selectMatches = (state, path) => {
    const currentPath = selectRouterData(state).path;
    return currentPath.indexOf(path) === 0;
};
