class Mediator {

    constructor() {
        this.handlers = {};
    }

    onActions(actions, handler) {
        actions.forEach(action => this.on(action, handler));
    }

    on(action, handler) {
        if (!this.handlers[action]) {
            this.handlers[action] = [];
        }

        this.handlers[action].push(handler);
    }

    handle(action, dispatch, getState) {
        const handlers = this.handlers[action.type];

        if (handlers) {
            handlers.forEach(handler => handler(action, dispatch, getState));
        }
    }
}

export default Mediator;
