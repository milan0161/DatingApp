import {
  PayloadAction,
  createEntityAdapter,
  createSelector,
  createSlice,
  current,
} from '@reduxjs/toolkit';
import { RootState } from '../../../app/store/store';

const messagesAdapter = createEntityAdapter<Message>({
  selectId: (message) => message.id,
});

const initialState = messagesAdapter.getInitialState();
// const initialState = {
//   messages: [],
// } as IMessageInitalState;

const messageSlice = createSlice({
  name: 'message',

  initialState: initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      messagesAdapter.upsertMany(state, action.payload);
    },

    addNewMessage: (state, action: PayloadAction<Message>) => {
      // let messages = [...state.messages, action.payload];
      // state.messages = [...messages];
      messagesAdapter.addOne(state, action.payload);
    },
    updateMessages: (state) => {
      const allMessages = { ...current(state) };
      const unUpdatedIds = [];

      for (const message in allMessages.entities) {
        if (allMessages.entities[message]!.dateRead === null) {
          unUpdatedIds.push(message);
        }
      }
      const updatedMessages: any = [];
      unUpdatedIds.forEach((m) => {
        updatedMessages.push({
          id: m,
          changes: {
            ...allMessages.entities[m],
            dateRead: new Date(Date.now()).toISOString(),
          },
        });
      });
      messagesAdapter.updateMany(state, updatedMessages);
    },
  },
});

export default messageSlice.reducer;
export const {
  selectAll,
  selectById: selectMessageById,
  selectIds: selecetMessagesIds,
} = messagesAdapter.getSelectors((state: RootState) => state.message);
// const messages = (state: RootState) => state.message;
export const selectAllMessages = createSelector([selectAll], (messages) => {
  return messages;
});
// export const selectMessageWithId = createSelector(
//   [selectAll, (state, messageId) => messageId],
//   (messages, messageId) => {
//     const singleMessage = messages.find((message) => message.id === messageId);
//     return singleMessage;
//   },
// );

export const { setMessages, addNewMessage, updateMessages } =
  messageSlice.actions;
