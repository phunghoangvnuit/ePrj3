import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import authReducer from './authReducer';


const persistCommonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

const authPersistConfig = {
  ...persistCommonConfig,
  key: 'auth',
  whitelist: ['isLoggedIn', 'token', 'currentUser'],
};


const rootReducer = (history) =>
  combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
  });

export default rootReducer;
