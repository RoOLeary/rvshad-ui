import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SavedDocumentResponse, ConnectedObject } from '@/types/types';

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
          createdByMe:true
        }
      }),
      providesTags: ['SavedDocument'],
    }),

    getDocumentById: builder.query<SavedDocumentResponse, void>({
      query: (id) => ({
        url: `saveddocument/${id}`,
      }),
    }),

    getConnectedObjects: builder.query<ConnectedObject[], { id: string; type: string }>({
      query: ({ id, type }) => `linking/${id}?objectType[]=${type}`,
    }),
  }),
});

export const { 
  useGetSavedDocumentsQuery, 
  useGetDocumentByIdQuery,
  useLazyGetConnectedObjectsQuery,
  usePrefetch
} = documentApi;