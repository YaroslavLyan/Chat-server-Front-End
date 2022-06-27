import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'authorization',
    initialState: {
      userAuth: null,
      userLoading: true,
      usersList: [],
    },
    reducers: {
      auth: (state, { payload }) => {
        return {
          ...state,
          userAuth: payload,
        };
      },
      loading: (state, { payload }) => {
          return {
          ...state,
          userLoading: payload,
        };
      },
      users: (state, { payload }) => {
        return {
        ...state,
        usersList: payload,
        };
      },
    }
  })

  export const { auth, loading, users } = authSlice.actions
  export default authSlice;