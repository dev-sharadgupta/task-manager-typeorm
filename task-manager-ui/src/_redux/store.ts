import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/pages/auth/slice/index.tsx"
import { rootAPI } from "@/_api";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        [rootAPI.reducerPath]: rootAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(rootAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;