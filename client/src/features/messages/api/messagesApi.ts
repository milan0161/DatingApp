import { HubConnectionBuilder } from '@microsoft/signalr';
import { apiSlice } from '../../../app/api/apiSLice';
import { getAToken } from '../../../app/utils/saveToken';
const hubUrl = import.meta.env.VITE_REACT_APP_HUB_URL;
const token = getAToken();
const defaultValue: PaginationMessagesRequest = {
  page: 1,
  itemsPerPage: 10,
  container: 'Inbox',
};

const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<
      Pagination<Message>,
      PaginationMessagesRequest | void
    >({
      query: ({
        itemsPerPage,
        page,
        container,
      }: PaginationMessagesRequest = defaultValue) => ({
        url: `api/messages?pageNumber=${page}&pageSize=${itemsPerPage}&container=${container}`,
      }),
      transformResponse: (response: Message[], meta, args) => {
        let res: Pagination<Message>;
        let pagin = JSON.parse(meta?.response?.headers.get('pagination')!);
        res = {
          currentPage: pagin.currentPage,
          itemsPerPage: pagin.itemsPerPage,
          totalItems: pagin.totalItems,
          totalPages: pagin.totalPages,
          data: response,
        };
        return res;
      },
      providesTags: ['Messages'],
    }),
    getMessageThread: builder.query<Message[], string>({
      query: (username) => `hubs/messages?user=${username}`,
      //  url: `api/messages/thread/${username}`
      // async onCacheEntryAdded(
      //   arg,
      //   { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      // ) {
      //   const connection = new HubConnectionBuilder()
      //     .withUrl(`${hubUrl}message?user=${arg}`, {
      //       accessTokenFactory: () => token!,
      //     })
      //     .withAutomaticReconnect()
      //     .build();

      //   try {
      //     await cacheDataLoaded;
      //     connection
      //       .start()
      //       .then(() => console.log('connected'))
      //       .catch((err) => console.log(err));

      //     connection?.on('RecieveMessageThread', (data: any) => {
      //       console.log(data);
      //     });
      //   } catch (error) {
      //     console.log(error);
      //   }
      //   await cacheEntryRemoved;
      //   connection.stop().then(() => {
      //     console.log('disconected');
      //   });
      // },
      providesTags: ['Messages'],
    }),
    createMessage: builder.mutation<Message, SendMessage>({
      query: (data) => ({
        url: 'api/messages',
        method: 'POST',
        body: data,
      }),

      invalidatesTags: ['Messages'],
    }),
    deleteMessage: builder.mutation<void, number>({
      query: (id) => ({
        url: `api/messages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetMessageThreadQuery,
  useCreateMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;
