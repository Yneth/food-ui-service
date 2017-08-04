import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Mediator from 'services/mediator';
import createMediatorMiddleware from 'services/mediator/middleware';
import { Router } from 'features/router';
import createRouterMiddleware from 'features/router/middleware';
import rootReducer from './rootReducer';

const configureStore = (initialState) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const mediator = new Mediator();
    const router = new Router();

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(
                thunk,
                createMediatorMiddleware(mediator),
                createRouterMiddleware(router),
            ),
        ),
    );

    return {
        store,
        mediator,
        router,
    };
};

export default configureStore;
