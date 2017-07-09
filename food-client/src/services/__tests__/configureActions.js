import configureActions, { getAsyncTypes } from '../configureActions';

describe('configureActions', () => {
    describe('#actionCreator', () => {
        let configureAction;

        beforeEach(() => {
            configureAction = configureActions('PREFIX/');
        });

        it('should have type without prefix if no specified', () => {
            const configureActionWithoutPrefix = configureActions();
            const creator = configureActionWithoutPrefix('TYPE');

            expect(creator.type).toBe('TYPE');
        });

        it('should have type', () => {
            const creator = configureAction('TYPE');

            expect(creator.type).toBe('PREFIX/TYPE');
        });

        it('should create actions with type', () => {
            const creator = configureAction('TYPE');

            expect(creator().type).toBe('PREFIX/TYPE');
        });

        it('should create actions with payload', () => {
            const creator = configureAction('TYPE');
            const payload = { msg1: 'hello', msg2: 'world' };

            expect(creator(payload).payload).toEqual(payload);
        });

        it('should intercept payload creation', () => {
            const creator = configureAction('TYPE', payload => ({ msg: payload.msg1 }));
            const payload = { msg1: 'hello', msg2: 'world' };

            expect(creator(payload).payload).toEqual({ msg: 'hello' });
        });
    });

    describe('#getAsyncTypes', () => {
        let type;
        beforeEach(() => {
            type = getAsyncTypes('TYPE');
        });

        it('should have REQUEST type', () => {
            expect(type.request).toBe('TYPE_REQUEST');
        });

        it('should have SUCCESS type', () => {
            expect(type.success).toBe('TYPE_SUCCESS');
        });

        it('should have FAILURE type', () => {
            expect(type.failure).toBe('TYPE_FAILURE');
        });
    });

    describe('#asyncCreator', () => {
        let configureAction;
        let dispatch;

        beforeEach(() => {
            configureAction = configureActions('PREFIX/');
            dispatch = jest.fn();
        });

        it('should have async types', () => {
            const creator = configureAction('TYPE').async;

            expect(creator.type).toEqual({
                request: 'PREFIX/TYPE_REQUEST',
                success: 'PREFIX/TYPE_SUCCESS',
                failure: 'PREFIX/TYPE_FAILURE',
            });
        });

        it('should dispatch request action', () => {
            const creator = configureAction('TYPE').async;

            creator({})(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                type: 'PREFIX/TYPE_REQUEST',
            });
        });

        it('should dispatch success if no interceptor passed', () => {
            const creator = configureAction('TYPE').async;

            return creator({ message: 'hello' })(dispatch).then(() => {
                expect(dispatch).toHaveBeenCalledWith({
                    type: 'PREFIX/TYPE_SUCCESS',
                    result: { message: 'hello' },
                });
            });
        });

        it('should dispatch success on resolve promise', () => {
            const interceptor = ({ msg1: message }) => Promise.resolve({ message });

            const creator = configureAction('TYPE', interceptor).async;

            return creator({ msg1: 'hello', msg2: 'world' })(dispatch).then(() => {
                expect(dispatch).toHaveBeenCalledWith({
                    type: 'PREFIX/TYPE_SUCCESS',
                    result: { message: 'hello' },
                });
            });
        });

        it('should dispatch failure on resolve with error', () => {
            const interceptor = () => Promise.resolve({ error: 'error!' });

            const creator = configureAction('TYPE', interceptor).async;

            return creator({ msg1: 'hello', msg2: 'world' })(dispatch).then(() => {
                expect(dispatch).toHaveBeenCalledWith({
                    type: 'PREFIX/TYPE_FAILURE',
                    error: 'error!',
                });
            });
        });

        it('should dispatch failure on promise reject', () => {
            const interceptor = () => Promise.reject('error!');

            const creator = configureAction('TYPE', interceptor).async;

            return creator({ msg1: 'hello', msg2: 'world' })(dispatch).then(() => {
                expect(dispatch).toHaveBeenCalledWith({
                    type: 'PREFIX/TYPE_FAILURE',
                    error: 'error!',
                });
            });
        });
    });
});
