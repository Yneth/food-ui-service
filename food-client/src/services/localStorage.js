const TYPE_SUFFIX = '%type%';
const EXPIRES_SUFFIX = '%expires%';

const LocalStorage = {
    add(key, value, expires) {
        const type = typeof value;

        if (type === 'object') {
            value = JSON.stringify(value);
        }

        localStorage.setItem(key, value);
        localStorage.setItem(`${key}${TYPE_SUFFIX}`, type);
        if (expires) {
            localStorage.setItem(`${key}${EXPIRES_SUFFIX}`, expires.getTime());
        }
    },

    get(key) {
        if (LocalStorage.expired(key)) {
            LocalStorage.remove(key);
            return null;
        }

        const type = localStorage.getItem(`${key}${TYPE_SUFFIX}`);
        const value = localStorage.getItem(key);

        return type === 'object' ? JSON.parse(value) : value;
    },

    expired(key) {
        const expires = localStorage.getItem(`${key}${EXPIRES_SUFFIX}`);
        return expires !== null && expires !== undefined && +expires <= Date.now();
    },

    remove(key) {
        localStorage.removeItem(key);
        localStorage.removeItem(`${key}${TYPE_SUFFIX}`);
        localStorage.removeItem(`${key}${EXPIRES_SUFFIX}`);
    },

    clear() {
        localStorage.clear();
    },

    has(key) {
        const value = localStorage.getItem(key);

        return value !== null;
    },

    get length() {
        return localStorage.length;
    },
};

export default LocalStorage;
