import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../../app/api/apiSLice';

const defaultValue: PaginationUserRequest = {
  page: 1,
  itemsPerPage: 3,
  minAge: 18,
  maxAge: 100,
  orderBy: 'lastActive',
};

const memberApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query<Pagination<Member>, PaginationUserRequest | void>(
      {
        query: ({
          itemsPerPage,
          page,
          maxAge,
          minAge,
          gender,
          orderBy,
        }: PaginationUserRequest = defaultValue) => ({
          url: `api/users`,
          params: {
            pageNumber: page,
            pageSize: itemsPerPage,
            maxAge,
            minAge,
            gender,
            orderBy,
          },
        }),
        transformResponse: (response: Member[], meta, arg) => {
          let res: Pagination<Member>;
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
      },
    ),
    getMember: builder.query<Member, string>({
      query: (username) => ({ url: `api/users/${username}` }),
      providesTags: ['Member'],
    }),
    updateMember: builder.mutation<void, FormInput>({
      query: (data) => ({
        url: `api/users`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: ['Member'],
    }),
    addPhoto: builder.mutation<Photo, any>({
      query: (data) => ({
        url: `api/users/add-photo`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Member'],
    }),
    setMainPhoto: builder.mutation<void, number>({
      query: (photoId) => ({
        url: `api/users/set-main-photo/${photoId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Member'],
    }),
    deletePhoto: builder.mutation<void, number>({
      query: (photoId) => ({
        url: `api/users/delete-photo/${photoId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Member'],
    }),
  }),
});

export const {
  useGetMembersQuery,
  useGetMemberQuery,
  useUpdateMemberMutation,
  useAddPhotoMutation,
  useSetMainPhotoMutation,
  useDeletePhotoMutation,
} = memberApi;

export const selectMembersResult = memberApi.endpoints.getMembers.select();

const selectMembersData = createSelector(
  selectMembersResult,
  (memberResult) => memberResult.data,
);
