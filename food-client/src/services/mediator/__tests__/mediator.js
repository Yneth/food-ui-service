import Mediator from '../';

describe('mediator service', () => {
    let mediator;

    beforeEach(() => {
        mediator = new Mediator();
    });

    describe('on', () => {
        it('should add action handler', () => {
            const handler = () => {};
            mediator.on('ACTION', handler);

            expect(mediator.handlers).toEqual({
                ACTION: [
                    handler,
                ],
            });
        });

        it('should append handler to existing handlers', () => {
            const existingHandler = () => {};
            const newHandler = () => {};
            mediator.handlers = {
                ACTION: [
                    existingHandler,
                ],
            };

            mediator.on('ACTION', newHandler);

            expect(mediator.handlers).toEqual({
                ACTION: [
                    existingHandler,
                    newHandler,
                ],
            });
        });
    });

    describe('onActions', () => {
        it('should add handler for multiple actions', () => {
            const handler = () => {};

            mediator.onActions(['FIRST_ACTION', 'SECOND_ACTION'], handler);

            expect(mediator.handlers).toEqual({
                FIRST_ACTION: [
                    handler,
                ],
                SECOND_ACTION: [
                    handler,
                ],
            });
        });
    });

    describe('handle', () => {
        it('should call handlers on action', () => {
            const firstHandler = jest.fn();
            const secondHandler = jest.fn();

            const dispatch = () => {};
            const getState = () => {};
            const action = { type: 'ACTION' };

            mediator.handlers = {
                ACTION: [
                    firstHandler,
                    secondHandler,
                ],
            };

            mediator.handle(action, dispatch, getState);

            expect(firstHandler).toHaveBeenCalledWith(action, dispatch, getState);
            expect(secondHandler).toHaveBeenCalledWith(action, dispatch, getState);
        });
    });
});
