import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SavedDocumentResponse } from '@/types/types';

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.findest.com/api/search/',
    prepareHeaders: (headers) => {
      const token = import.meta.env.VITE_ACCESS_TOKEN;
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchItems: builder.mutation<SavedDocumentResponse, string>({
      query: (query) => `searchbar?query=${query}&api-version=2.0`
    }),
  }),
});

export const { useSearchItemsMutation } = searchApi;
