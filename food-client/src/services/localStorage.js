const LocalStorage = {
    add(key, value, expires) {
        const item = {
            value,
            expires: expires ? +expires : null,
        };

        localStorage.setItem(key, JSON.stringify(item));
    },

    get(key) {
        const item = JSON.parse(localStorage.getItem(key) || null);

        if (LocalStorage.expired(item)) {
            LocalStorage.remove(key);
            return null;
        }

        return item.value;
    },

    expired(item) {
        // If there is no item or expiration date passed
        return !item
            || (item.expires !== null && item.expires !== undefined && +item.expires <= Date.now());
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    clear() {
        localStorage.clear();
    },

    has(key) {
        const item = JSON.parse(localStorage.getItem(key) || null);

        return !LocalStorage.expired(item);
    },

    get length() {
        return localStorage.length;
    },
};

export default LocalStorage;
