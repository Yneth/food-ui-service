const createMiddleware = mediator => ({ dispatch, getState }) => next => (action) => {
    mediator.handle(action, dispatch, getState);
    return next(action);
};

export default createMiddleware;
