import { LOG_IN, LOG_OUT } from './constants';

const initialState = {
    username: '',
    token: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                username: action.payload.username,
                token: action.payload.token,
            };
        case LOG_OUT:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
