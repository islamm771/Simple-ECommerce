import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cartSlice from './features/CartSlice';
import productsSlice from './features/ProductsSlice';
import categoriesSlice from './features/CategoriesSlice';
import profileSlice from './features/ProfileSlice';

export const store = configureStore({
    reducer: {
        [cartSlice.reducerPath]: cartSlice.reducer,
        [productsSlice.reducerPath]: productsSlice.reducer,
        [categoriesSlice.reducerPath]: categoriesSlice.reducer,
        [profileSlice.reducerPath]: profileSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([cartSlice.middleware,
        productsSlice.middleware, categoriesSlice.middleware, profileSlice.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for dispatch and selector with types
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
