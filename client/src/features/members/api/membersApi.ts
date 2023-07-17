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
  }),
});

export const {
  useGetMembersQuery,
  useGetMemberQuery,
  useUpdateMemberMutation,
} = memberApi;
