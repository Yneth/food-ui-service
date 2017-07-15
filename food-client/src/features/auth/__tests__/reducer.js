import deepFreeze from 'services/deepFreeze';
import reducer from '../reducer';
import * as actions from '../actions';

describe('auth reducer', () => {
    it('should handle unknown action', () => {
        expect(reducer({ state: 'state' }, { type: 'random' })).toEqual({ state: 'state' });
    });

    it('should handle undefined state', () => {
        const expectedState = {
            error: '',
            loading: false,
            username: '',
            token: '',
        };

        expect(reducer(undefined, { type: 'random' })).toEqual(expectedState);
    });

    it('should handle LOGOUT action', () => {
        const state = {
            error: '',
            loading: false,
            username: 'Alex',
            token: '123',
        };

        deepFreeze(state);

        const expectedState = {
            error: '',
            loading: false,
            username: '',
            token: '',
        };

        expect(reducer(state, actions.logout())).toEqual(expectedState);
    });

    it('should handle LOGIN request action', () => {
        const state = {
            error: '',
            loading: false,
            username: '',
            token: '',
        };

        deepFreeze(state);

        const expectedState = {
            error: '',
            loading: true,
            username: '',
            token: '',
        };

        const newState = reducer(state, { type: actions.login.type.request });

        expect(newState).toEqual(expectedState);
    });

    it('should handle LOGIN SUCCESS action', () => {
        const state = {
            error: '',
            loading: true,
            username: '',
            token: '',
        };

        deepFreeze(state);

        const action = {
            type: actions.login.type.success,
            payload: { result: { username: 'Alex', token: '123' } },
        };

        const expectedState = {
            error: '',
            loading: false,
            username: 'Alex',
            token: '123',
        };

        expect(reducer(state, action)).toEqual(expectedState);
    });
});
