import { navigate, replaceTo, go } from './actions';

const createMiddleware = router => (store) => {
    router.setStore(store);
    return next => (action) => {
        if (action.type === navigate.type) {
            // set timeout not to break action chain order NAVIGATE -> SET_ROUTE
            setTimeout(() => router.navigate(action.payload.path), 0);
        } else if (action.type === replaceTo.type) {
            setTimeout(() => router.replaceTo(action.payload.path), 0);
        } else if (action.type === go.type) {
            router.go(action.payload.go);
        }

        return next(action);
    };
};

export default createMiddleware;

