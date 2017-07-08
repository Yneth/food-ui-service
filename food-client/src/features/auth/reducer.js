import { login, logout } from './actions';

const initialState = {
    username: '',
    token: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case login.type:
            return {
                ...state,
                username: action.payload.username,
                token: action.payload.token,
            };
        case logout.type:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
