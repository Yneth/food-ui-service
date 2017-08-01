import { changeRoute } from './actions';

class Router {
    constructor(store) {
        this.store = store;
        this.history = [];
    }

    navigate(path) {
        history.pushState(null, null, path);
        this.store.dispatch(changeRoute(path, {}));
    }

    go(n) {
        history.go(n);
    }
}

let instance = null;
const router = (...args) => {
    if (!instance || args.length > 0) {
        instance = new Router(...args);
    }
    return instance;
};

export default router;
