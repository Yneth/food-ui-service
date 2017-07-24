import * as fromLocalStorage from 'services/localStorage';
import * as actions from '../actions';
import { STORAGE_TOKEN_KEY, STORAGE_TOKEN_EXPIRATION_DELTA } from '../constants';

describe('auth actions', () => {

    let localStorageMock;

    beforeEach(() => {
        localStorageMock = {
            add: jest.fn(),
            remove: jest.fn(),
        };

        fromLocalStorage.default = localStorageMock;

        Date.now = jest.fn().mockReturnValue(30);
        Math.random = jest.fn().mockReturnValue(30);
    });

    describe('#login', () => {
        it('should have async AUTH/LOG_IN types', () => {
            expect(actions.login.type).toEqual({
                success: 'AUTH/LOG_IN_SUCCESS',
                failure: 'AUTH/LOG_IN_FAILURE',
                request: 'AUTH/LOG_IN_REQUEST',
            });
        });

        it('should set token in local storage', () => (
            actions.login('Alex')(() => {}).then(() => {
                expect(localStorageMock.add).toHaveBeenCalledWith(
                    STORAGE_TOKEN_KEY,
                    'u',
                    new Date(Date.now() + STORAGE_TOKEN_EXPIRATION_DELTA),
                );
            })
        ));
    });

    describe('#logout', () => {
        it('should have AUTH/LOG_OUT type', () => {
            expect(actions.logout.type).toBe('AUTH/LOG_OUT');
        });

        it('should remove token in local storage', () => {
            actions.logout();
            expect(localStorageMock.remove).toHaveBeenCalledWith(
                STORAGE_TOKEN_KEY,
            );
        });
    });
});
