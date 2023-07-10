import { apiSlice } from "../../../app/api/apiSLice";

const memberApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query<Member[], void>({
      query: () => ({ url: "api/users" }),
    }),
    getMember: builder.query<Member, string>({
      query: (username) => ({ url: `api/users/${username}` }),
    }),
  }),
});

export const { useGetMembersQuery, useGetMemberQuery } = memberApi;
