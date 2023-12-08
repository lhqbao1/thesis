import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/counterSlice';
import accountReducer from '../redux/account/accountSlice';
import workplaceReducer from '../redux/workplace/workplaceSlice'
import studentReducer from '../redux/account/studentSlice'
import lecturerReducer from '../redux/account/lecturerSlice'
import accountLecturerReducer from '../redux/account/accountLecturerSlice'
import accountAdminReducer from '../redux/account/accountAdminSlide'

// import orderReducer from '../redux/order/orderSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // blacklist: ['account','accountAdminReducer','accountLecturer'] // account will not be persisted
}

const rootReducer = combineReducers({
  counter: counterReducer,
  account: accountReducer,
  workplace: workplaceReducer,
  student: studentReducer,
  lecturer: lecturerReducer,
  accountLecturer: accountLecturerReducer,
  accountAdminReducer: accountAdminReducer

});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

let persistor = persistStore(store);

export { store, persistor };
