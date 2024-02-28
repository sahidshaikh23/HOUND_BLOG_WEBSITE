import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk"
import { authReducer } from "./Auth/auth.reducer.js";
import { blogReducer } from "./blogs/blog.reducer.js";

const encryptor = encryptTransform({
  secretKey: 'hsbvkhbskhjvbkhjsvbsbvbbskvbkshbv', // Replace with a strong secret key
  whitelist: ['authReducer'],
});
const persistConfig = {
  key: 'root',
  storage,
  // transforms: [encryptor], // Use redux-persist-transform-encrypt
};


const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);