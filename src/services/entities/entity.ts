import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Entity, SavedDocumentResponse } from '../../types/types'; // Adjust the import path as needed

export const entityApi = createApi({
  reducerPath: 'entityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.findest.com/api/',
    prepareHeaders: (headers) => {
      const token = import.meta.env.VITE_ACCESS_TOKEN;
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createEntity: builder.mutation<Entity, Partial<Entity>>({
      query: (entity) => ({
        url: '',
        method: 'POST',
        body: entity,
      }),
    }),
    getEntities: builder.query<Entity[], void>({
        query: () => ({
            url: 'entity',
            params: {
              orderBy: 2,
              createdByMe:false
            }
        })
    }),

    getEntityById: builder.query<SavedDocumentResponse, void>({
      query: (id) => ({
        url: `entity/${id}`,
      }),
    }),

    updateEntityTitle: builder.mutation<Entity, { id: number; title: string }>({
      query: ({ id, title }) => ({
        url: `/${id}/title`,
        method: 'PUT',
        body: { title },
      }),
    }),
    
    deleteEntity: builder.mutation<{ success: boolean; id: string }, number>({
      query: (id) => ({
          url: `/${id}`,
          method: 'DELETE',
      }),
  }),
  }),
});

export const { 
  useCreateEntityMutation,
  useGetEntitiesQuery,
  useGetEntityByIdQuery,
  useUpdateEntityTitleMutation,
  useDeleteEntityMutation,
} = entityApi;
