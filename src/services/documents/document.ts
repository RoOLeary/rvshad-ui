import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SavedDocumentResponse } from '@/types/types';

export const documentApi = createApi({
  reducerPath: 'documentApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.findest.com/api/',
    prepareHeaders: (headers) => {
      const token = import.meta.env.VITE_ACCESS_TOKEN;
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['SavedDocument'],
  endpoints: (builder) => ({
    getSavedDocuments: builder.query<SavedDocumentResponse, void>({
      query: () => ({
        url: 'saveddocument',
        params: {
          orderBy: 2,
          doIncludePatents: true,
          doIncludeScienceArticles: true,
          doIncludeWeblinks: true,
          createdByMe:false
        }
      }),
      providesTags: ['SavedDocument'],
    }),
  }),
});

export const { useGetSavedDocumentsQuery } = documentApi;