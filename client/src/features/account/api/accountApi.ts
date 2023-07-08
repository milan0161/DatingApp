import { apiSlice } from "../../../app/api/apiSLice";

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, ReqLogin>({
      query: (data) => ({
        url: "api/account/login",
        method: "POST",
        body: { username: data.username, password: data.password },
      }),
    }),
    register: builder.mutation<User, ReqLogin>({
      query: (data) => ({
        url: "api/account/register",
        method: "POST",
        body: { username: data.username, password: data.password },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = accountApiSlice;
