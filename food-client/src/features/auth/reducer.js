import { login, logout } from './actions';

const initialState = {
    loading: false,
    error: '',
    username: '',
    token: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case login.type.request:
            return { ...state, loading: true };
        case login.type.failure:
            return {
                ...initialState,
                loading: false,
                error: action.payload.error,
            };
        case login.type.success:
            return {
                ...initialState,
                username: action.payload.result.username,
                token: action.payload.result.token,
            };
        case logout.type:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
