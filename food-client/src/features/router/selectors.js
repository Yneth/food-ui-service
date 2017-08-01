import { ROUTER_KEY } from './constants';

export const selectRouterData = state => state[ROUTER_KEY];

export const selectMatch = (state, name) => selectRouterData(state).matches[name];
