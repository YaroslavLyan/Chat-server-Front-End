import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
      messagesSMS: [],

    },
    reducers: {
      sms: (state, { payload }) => {
        return {
          ...state,
          messagesSMS: [...state.messagesSMS, payload]
        };
      },

    }
  })

  export const { sms } = messagesSlice.actions
  export default messagesSlice;