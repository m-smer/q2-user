import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {quizApi} from '../services/quizApi';
import storage from 'redux-persist/lib/storage';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import {sessionReducer} from '../slices/sessionSlice';
import {passingDataApi} from '../services/passingDataApi';
import passingListener from '../middlewares/passingListener';

const reducers = combineReducers({
    [quizApi.reducerPath]: quizApi.reducer,
    [passingDataApi.reducerPath]: passingDataApi.reducer,
    session: sessionReducer,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['quizApi', 'session', 'passingDataApi'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        })
            .prepend(passingListener.middleware)
            .concat(quizApi.middleware)
            .concat(passingDataApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
