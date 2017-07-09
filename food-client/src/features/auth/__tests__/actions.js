import * as actions from '../actions';

describe('auth actions', () => {
    describe('#login', () => {
        it('should have async AUTH/LOG_IN types', () => {
            expect(actions.login.type).toEqual({
                success: 'AUTH/LOG_IN_SUCCESS',
                failure: 'AUTH/LOG_IN_FAILURE',
                request: 'AUTH/LOG_IN_REQUEST',
            });
        });
    });

    describe('#logout', () => {
        it('should have AUTH/LOG_OUT type', () => {
            expect(actions.logout.type).toBe('AUTH/LOG_OUT');
        });
    });
});
