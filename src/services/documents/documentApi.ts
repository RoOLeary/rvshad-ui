import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SavedDocumentResponse, ConnectedObject } from '@/types/types';

// Define interfaces for document state
interface Document {
  id: string;
  url: string;
  title: string;
  type: string;
  abstract: string;
}

interface DocumentState {
  documents: Document[];
  selectedDocument: Document | null;
  filters: {
    id?: string;
    name?: string;
    title?: string;
  };
}

const initialState: DocumentState = {
  documents: [],
  selectedDocument: null,
  filters: {
    id: '',
    name: '',
    title: '',
  },
};

// Combine slice logic with RTK Query
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
          createdByMe: true,
        },
      }),
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

// Add slice reducers for local state management
const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    // Set selected document
    setSelectedDocument: (state, action: PayloadAction<Document | null>) => {
      state.selectedDocument = action.payload;
    },

    // Update filters
    setFilters: (state, action: PayloadAction<DocumentState['filters']>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    // Clear filters
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setSelectedDocument, setFilters, clearFilters } = documentSlice.actions;

// Combine RTK Query and slice reducer for the store
export const documentReducer = {
  api: documentApi.reducer,
  slice: documentSlice.reducer,
};

// Auto-generated RTK Query hooks
export const {
  useGetSavedDocumentsQuery,
  useGetDocumentByIdQuery,
  useLazyGetConnectedObjectsQuery,
  useAddDocumentMutation,
  useDeleteDocumentMutation,
  usePrefetch
} = documentApi;
