import { setRoute } from './actions';

class Router {

    constructor() {
        this.routes = {};
        this.patternsCache = {};

        window.addEventListener('popstate', this.onPopState.bind(this));
    }

    setStore(store) {
        this.store = store;
    }

    registerRoute(name, pattern) {
        this.routes[name] = this.compilePattern(pattern);
    }

    removeRoute(name) {
        delete this.routes[name];
    }

    matchPath(path) {
        return Object.keys(this.routes).reduce((matches, routeName) => {
            const { regexp, requiredParams } = this.routes[routeName];
            const match = path.match(regexp);
            if (match) {
                matches[routeName] = requiredParams.reduce((params, paramName, i) => {
                    params[paramName] = match[i + 1];
                    return params;
                }, {});
            }

            return matches;
        }, {});
    }

    compilePattern(pattern) {
        if (!this.patternsCache[pattern]) {
            const PARAM_PATTERN = '([^/]+)';
            const requiredParams = [];
            const regexpPattern = pattern.replace(/:([^/]*)/g, (match, paramName) => {
                requiredParams.push(paramName);
                return PARAM_PATTERN;
            });
            const regexp = new RegExp(regexpPattern);

            this.patternsCache[pattern] = {
                regexp,
                requiredParams,
            };
        }

        return this.patternsCache[pattern];
    }

    replaceTo(path) {
        const matches = this.matchPath(path);
        history.replaceState({ path, matches }, null, path);
        this.setState(path, matches);
    }

    navigate(path) {
        const matches = this.matchPath(path);
        history.pushState({ path, matches }, null, path);
        this.setState(path, matches);
    }

    onPopState(e) {
        // rehydrate router data from history
        const routerData = e.state
            || {
                path: location.pathname,
                matches: this.matchPath(location.pathname),
            };
        this.setState(routerData.path, routerData.matches);
    }

    setState(path, matches) {
        this.store.dispatch(setRoute(path, matches));
    }

    go(n) {
        history.go(n);
    }
}

export default Router;
