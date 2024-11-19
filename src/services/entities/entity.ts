import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Entity } from '../../types/types'; // Adjust the import path as needed

export const entityApi = createApi({
  reducerPath: 'entityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.findest.com/api/',
    prepareHeaders: (headers) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL3VuaXZlcnNlLmZpbmRlc3QuY29tIiwiaXNzIjoidW5pdmVyc2UuZmluZGVzdC5jb20iLCJleHAiOjE3NjI5NjEwODgsIm5iZiI6MTczMTQyNTA4OCwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InJvbmFuLm9sZWFyeUBmaW5kZXN0LmV1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJjNTVmODFiNS1mNTViLTQ3Y2UtYjkxZi0zNTE0YjhlY2EwZWEiLCJqdGkiOiJkMmQwMjIzMS04ODQ0LTQ0NjItYjAxOC0yNDY4NTRjOWM1N2MiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiRmluZGVzdEFkbWluaXN0cmF0b3IiLCJPd25lciJdLCJ0ZW5hbnRJZCI6IjA4ZGFlMjkzLWM1YjYtNGIxNC04MmNjLTNkNTIxYjdjN2UwOSIsInRlbmFudE5hbWUiOiJVbml2ZXJzZSBEZW1vIiwiaXNGaW5kZXN0VGVuYW50IjpmYWxzZSwicGVybWlzc2lvbnMiOlsiMDhkYWUyOTMtYzViNi00YjE0LTgyY2MtM2Q1MjFiN2M3ZTA5IiwiUmF0aW5nLlJlYWQiLCJSYXRpbmcuV3JpdGUiLCJSYXRpbmcuRGVsZXRlIiwiQ29tbWVudC5SZWFkIiwiQ29tbWVudC5Xcml0ZSIsIkNvbW1lbnQuRGVsZXRlIiwiTWF0dXJpdHlSYWRhci5SZWFkIiwiTWF0dXJpdHlSYWRhci5Xcml0ZSIsIk1hdHVyaXR5UmFkYXIuRGVsZXRlIiwiQWR2YW5jZWQiXSwiaWF0IjoxNzMxNDI1MDg4fQ.4vnV9YaO8nW_4JfHPGXBaO6M2jo_q8JlgPZ4qXBjUvQ";
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
    getEntityById: builder.query<Entity, number>({
      query: (id) => `/${id}`,
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
