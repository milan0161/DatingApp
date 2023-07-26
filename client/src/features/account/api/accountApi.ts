import { apiSlice } from '../../../app/api/apiSLice';
import { showApiError, showError } from '../../../app/utils/ToastMsg';

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, ReqLogin>({
      query: (data) => ({
        url: 'api/account/login',
        method: 'POST',
        body: { username: data.username, password: data.password },
      }),
    }),
    register: builder.mutation<User, ReqRegister>({
      query: (data) => ({
        url: 'api/account/register',
        method: 'POST',
        body: { ...data },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = accountApiSlice;
