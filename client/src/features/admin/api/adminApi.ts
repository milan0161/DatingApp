import { apiSlice } from '../../../app/api/apiSLice';

const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersWithRole: builder.query<MemberRoles[], void>({
      query: () => ({
        url: 'api/admin/users-with-roles',
      }),
      providesTags: ['MemberRole'],
    }),
    updateMemberRole: builder.mutation<string[], EditRoleReq>({
      query: (data) => ({
        url: `api/admin/edit-roles/${data.username}?roles=${data.role}`,
        method: 'PUT',
      }),
      invalidatesTags: ['MemberRole'],
    }),
  }),
});

export const { useGetUsersWithRoleQuery, useUpdateMemberRoleMutation } =
  adminApi;
