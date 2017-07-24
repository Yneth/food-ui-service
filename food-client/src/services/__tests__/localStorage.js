import LocalStorage from '../localStorage';

const localStorageMock = (() => {
    let store = {};
    let length = 0;
    return {
        getItem(key) {
            return store[key];
        },
        setItem(key, value) {
            length++;
            store[key] = value.toString();
        },
        clear() {
            length = 0;
            store = {};
        },
        removeItem(key) {
            length--;
            delete store[key];
        },
        get length() {
            return length;
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

    describe('remove', () => {
        it('should remove value by key', () => {
            localStorage.setItem('key', 'value');
            localStorage.setItem('key%type%', 'string');
            localStorage.setItem('key%expires%', '0');

            LocalStorage.remove('key');

            expect(LocalStorage.get('key')).toBe(undefined);
            expect(LocalStorage.get('key%type%')).toBe(undefined);
            expect(LocalStorage.get('key%expires%')).toBe(undefined);
        });
    });

    describe('clear', () => {
        it('should clear local storage', () => {
            localStorage.setItem('key1', 'value1');
            localStorage.setItem('key2', 'value2');
            localStorage.setItem('key3', 'value3');
            LocalStorage.clear();

            expect(localStorage.length).toBe(0);
            expect(LocalStorage.get('key1')).toBe(undefined);
            expect(LocalStorage.get('key2')).toBe(undefined);
            expect(LocalStorage.get('key3')).toBe(undefined);
        });
    });

    describe('length', () => {
        it('should get local storage length', () => {
            localStorage.setItem('key1', 'value1');
            localStorage.setItem('key2', 'value2');
            localStorage.setItem('key3', 'value3');

            expect(LocalStorage.length).toBe(3);
        });
    });

    describe('expired', () => {
        it('should return true if date now is bigger than exp date', () => {
            Date.now = () => 31;
            localStorage.setItem('key', 'value');
            localStorage.setItem('key%expires%', 30);

            expect(LocalStorage.expired('key')).toBe(true);
        });

        it('should return false if date now is smaller than exp date', () => {
            Date.now = () => 1;
            localStorage.setItem('key', 'value');
            localStorage.setItem('key%expires%', 30);

            expect(LocalStorage.expired('key')).toBe(false);
        });

        it('should item with such key does not exist', () => {
            expect(LocalStorage.expired('key')).toBe(false);
        });
    });

    describe('has', () => {
        it('should return true if item exists', () => {
            localStorage.setItem('key', 'value');
            localStorage.setItem('key%type%', 'string');
            localStorage.setItem('key%expires%', 30);

            expect(LocalStorage.has('key')).toBe(true);
        });

        it('should return false if item does not exists', () => {
            expect(LocalStorage.has('key')).toBe(false);
        });

        it('should return false if item has expired', () => {
            Date.now = () => 31;
            localStorage.setItem('key', 'value');
            localStorage.setItem('key%type%', 'string');
            localStorage.setItem('key%expires%', 30);

            expect(LocalStorage.has('key')).toBe(false);
        });
    });
});
