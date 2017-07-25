import { constants } from 'features/auth';
import LocalStorage from 'services/localStorage';
import extractBySchema from 'services/extractBySchema';

const cacheSchema = {
    auth: true,
};

const cache = {

    getState() {
        const token = LocalStorage.get(constants.STORAGE_TOKEN_KEY);
        return LocalStorage.get(token) || undefined;
    },

    setStore(store) {
        window.addEventListener('unload', () => {
            const token = LocalStorage.get(constants.STORAGE_TOKEN_KEY);
            if (token) {
                LocalStorage.add(token, extractBySchema(store.getState(), cacheSchema));
            }
        });
    },
};

export default cache;
