import { createAppSlice } from '@/lib/createAppSlice';
import type { AppThunk } from '@/lib/store';
import type { PayloadAction } from '@reduxjs/toolkit';

export type NavigateState = {
  path: string;
  name: string;
}[];

const initialState: NavigateState = [
  {
    name: 'sample',
    path: '/sample',
  },
  {
    name: 'verify',
    path: '/verify',
  },
  {
    name: 'quotes',
    path: '/quotes',
  },
  {
    name: 'home',
    path: '/',
  },
];

// If you are not using async thunks you can use the standalone `createSlice`.
export const navigateSlice = createAppSlice({
  name: 'navigate',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    setNavi: create.reducer((state, action: PayloadAction<NavigateState>) => {
      state = action.payload;
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectNavigate: (navigate) => navigate,
  },
});

// Action creators are generated for each case reducer function.
export const { setNavi } = navigateSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectNavigate } = navigateSlice.selectors;
