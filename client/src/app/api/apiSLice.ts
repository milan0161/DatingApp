import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

const baseUrl: string = import.meta.env.VITE_REACT_APP_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).account.user.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  },
});
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
