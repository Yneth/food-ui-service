import { combineReducers } from 'redux';
import { reducer as auth, constants as authConstants } from 'features/auth';
import { reducer as router, constants as routerConstants } from 'features/router';


const rootReducer = combineReducers({
    [authConstants.AUTH_KEY]: auth,
    [routerConstants.ROUTER_KEY]: router,
});

export default rootReducer;
