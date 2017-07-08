import { combineReducers } from 'redux';
import { reducer as auth } from 'features/auth';

const rootReducer = combineReducers({
    auth,
});

export default rootReducer;
