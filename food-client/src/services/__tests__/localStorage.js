import LocalStorage from '../localStorage';

const localStorageMock = (() => {
    let store = {};
    return {
        getItem(key) {
            return store[key];
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        clear() {
            store = {};
        },
        removeItem(key) {
            delete store[key];
        },
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('LocalStorage service', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    describe('add', () => {
        it('should add value by key to localStorage', () => {
            LocalStorage.add('key', 'value');

            expect(localStorage.getItem('key')).toBe('value');
        });

        it('should add set value type', () => {
            LocalStorage.add('key', 'value');

            expect(localStorage.getItem('key%type%')).toBe('string');
        });

        it('should add expiration date if passed', () => {
            LocalStorage.add('key', 'value', new Date(30));

            expect(localStorage.getItem('key%expires%')).toBe('30');
        });

        it('should stringify object as json', () => {
            LocalStorage.add('key', { prop: 'value' });

            expect(localStorage.getItem('key')).toBe('{"prop":"value"}');
        });
    });

    describe('get', () => {
        it('should get value by key to localStorage', () => {
            localStorage.setItem('key', 'value');
            localStorage.setItem('key%type%', 'string');

            expect(LocalStorage.get('key')).toBe('value');
        });

        it('should get parsed json', () => {
            localStorage.setItem('key', '{"prop":"value"}');
            localStorage.setItem('key%type%', 'object');

            expect(LocalStorage.get('key')).toEqual({
                prop: 'value',
            });
        });

        it('should return null and remove if item expired', () => {
            localStorage.setItem('key', 'value');
            localStorage.setItem('key%type%', 'string');
            localStorage.setItem('key%expires%', 30);

            expect(LocalStorage.get('key')).toBe(null);
            expect(localStorage.getItem('key')).toBe(undefined);
        });
    });
});
