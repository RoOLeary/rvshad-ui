import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SavedDocumentResponse, ConnectedObject } from '@/types/types';

interface Document {
  id: string;
  url: string;
  title: string;
  type: string;
  abstract: string;
}

export const documentApi = createApi({
  reducerPath: 'documentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = import.meta.env.VITE_ACCESS_TOKEN;
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['SavedDocument'],
  endpoints: (builder) => ({
    getSavedDocuments: builder.query<SavedDocumentResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => {
        console.log('Fetching documents:', { page, limit });
        return {
          url: 'saveddocument',
          params: {
            orderBy: 2,
            doIncludePatents: true,
            doIncludeScienceArticles: true,
            doIncludeWeblinks: true,
            createdByMe: true,
            page, // Pagination
            limit, // Number of documents per page
          },
        };
      },
      providesTags: ['SavedDocument'],
    }),

    getDocumentById: builder.query<SavedDocumentResponse, string>({
      query: (id) => `saveddocument/${id}`,
      providesTags: (result, error, id) => [{ type: 'SavedDocument', id }],
    }),

    getConnectedObjects: builder.query<ConnectedObject[], { id: string; type: string }>({
      query: ({ id, type }) => `linking/${id}?objectType[]=${type}`,
    }),

    addDocument: builder.mutation<void, Document>({
      query: (newDocument) => ({
        url: 'saveddocument',
        method: 'POST',
        body: newDocument,
      }),
      invalidatesTags: ['SavedDocument'],
    }),

    deleteDocument: builder.mutation<void, string>({
      query: (id) => ({
        url: `saveddocument/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SavedDocument'],
    }),
  }),
});

export const {
  useGetSavedDocumentsQuery,
  useGetDocumentByIdQuery,
  useLazyGetConnectedObjectsQuery,
  useAddDocumentMutation,
  useDeleteDocumentMutation,
  usePrefetch,
} = documentApi;
