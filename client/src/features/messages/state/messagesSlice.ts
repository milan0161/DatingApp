import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
  } as IMessageInitalState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addNewMessage: (state, action: PayloadAction<Message>) => {
      let messages = [...state.messages, action.payload];
      state.messages = [...messages];
    },
    updateMessages: (state) => {
      state.messages.map((message) => {
        if (!message.dateRead) {
          message.dateRead = new Date().toISOString();
        }
      });
    },
  },
});

export default messageSlice.reducer;
export const { setMessages, addNewMessage, updateMessages } =
  messageSlice.actions;
