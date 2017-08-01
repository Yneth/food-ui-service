import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Mediator from 'services/mediator';
import createMiddleware from 'services/mediator/middleware';
import rootReducer from './rootReducer';

const configureStore = (initialState) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const mediator = new Mediator();

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunk, createMiddleware(mediator)),
        ),
    );

    return store;
};

export default configureStore;
