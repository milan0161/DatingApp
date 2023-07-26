import { apiSlice } from '../../../app/api/apiSLice';

const likeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addLike: builder.mutation<void, string>({
      query: (username) => ({
        url: `api/likes/${username}`,
        method: 'POST',
      }),
      invalidatesTags: ['Likes'],
    }),
    getLikes: builder.query<Pagination<Member>, PaginationLikesRequest>({
      query: ({ predicate, itemsPerPage, page }) => ({
        url: `api/likes?predicate=${predicate}&pageNumber=${page}&pageSize=${itemsPerPage}`,
      }),
      transformResponse: (res: Member[], meta, args) => {
        let response: Pagination<Member>;
        let pagin = JSON.parse(meta?.response?.headers.get('pagination')!);

        response = {
          currentPage: pagin.currentPage,
          itemsPerPage: pagin.itemsPerPage,
          totalItems: pagin.totalItems,
          totalPages: pagin.totalPages,
          data: res,
        };
        return response;
      },
      providesTags: ['Likes'],
    }),
  }),
});

export const { useAddLikeMutation, useGetLikesQuery } = likeApi;
