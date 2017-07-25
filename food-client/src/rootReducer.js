import { combineReducers } from 'redux';
import { reducer as auth, constants as authConstants } from 'features/auth';

const rootReducer = combineReducers({
    [authConstants.AUTH_KEY]: auth,
});

export default rootReducer;
