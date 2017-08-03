import { Router } from 'features/router';
import cache from './configuteCache';
import configureStore from './configureStore';

const initialState = cache.getState();
const store = configureStore(initialState);

cache.setStore(store);
Router.initialize(store);
