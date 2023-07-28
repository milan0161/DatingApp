import { apiSlice } from '../../../app/api/apiSLice';

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
      query: (username) => ({ url: `api/messages/thread/${username}` }),
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
