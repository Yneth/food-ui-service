import createMiddleware from '../middleware';

const create = () => {
    const mediator = {
        handle: jest.fn(),
    };
    const store = {
        getState: jest.fn(() => ({})),
        dispatch: jest.fn(),
    };
    const next = jest.fn();

    const invoke = action => createMiddleware(mediator)(store)(next)(action);

    return { mediator, store, next, invoke };
};

describe('mediator middleware', () => {
    it('should handle action', () => {
        const { mediator, store, invoke } = create();

        const action = { type: 'SOME_ACTION' };

        invoke(action);

        expect(mediator.handle).toHaveBeenCalledWith(action, store.dispatch, store.getState);
    });

    it('should call next with action', () => {
        const { next, invoke } = create();

        const action = { type: 'SOME_ACTION' };

        invoke(action);

        expect(next).toHaveBeenCalledWith(action);
    });
});
