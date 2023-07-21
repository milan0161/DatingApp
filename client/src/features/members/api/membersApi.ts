import { apiSlice } from '../../../app/api/apiSLice';

const memberApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query<Member[], void>({
      query: () => ({ url: 'api/users' }),
    }),
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
