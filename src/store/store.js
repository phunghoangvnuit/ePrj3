import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';

export const history = createBrowserHistory();

const store = createStore(
  rootReducer(history),
  applyMiddleware(thunk)
);

const persistor = persistStore(store);

export { store, persistor };
