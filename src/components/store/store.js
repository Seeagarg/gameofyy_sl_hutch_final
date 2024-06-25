
import {configureStore,combineReducers} from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage";
import LanguageSliceReducer from './LanguageSlice';
import persistReducer from "redux-persist/lib/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import gameReducer from './Slice';




const rootReducer=combineReducers({
    LanguageSlice:LanguageSliceReducer,
    game: gameReducer,
})

const persistConfig = {
    key:'root',
    storage,
    blocklist:['game']
}

const persistedReducer = persistReducer(persistConfig,rootReducer);


export const store = configureStore({
    reducer:persistedReducer
})

export const persistor = persistStore(store);




// import { configureStore } from '@reduxjs/toolkit';
// import gameReducer from './Slice';

// const store = configureStore({
//   reducer: {
//     game: gameReducer,
//   },
// });

// export default store;



