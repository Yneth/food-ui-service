import { setRoute } from './actions';

const initialState = {
    path: '',
    matches: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case setRoute.type:
            return {
                ...action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
