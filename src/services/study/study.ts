import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Study } from '../../types/types'; // Adjust the import path as needed

export const studyApi = createApi({
  reducerPath: 'studyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.findest.com/api/',
    prepareHeaders: (headers) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL3VuaXZlcnNlLmZpbmRlc3QuY29tIiwiaXNzIjoidW5pdmVyc2UuZmluZGVzdC5jb20iLCJleHAiOjE3NjI5NjEwODgsIm5iZiI6MTczMTQyNTA4OCwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InJvbmFuLm9sZWFyeUBmaW5kZXN0LmV1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJjNTVmODFiNS1mNTViLTQ3Y2UtYjkxZi0zNTE0YjhlY2EwZWEiLCJqdGkiOiJkMmQwMjIzMS04ODQ0LTQ0NjItYjAxOC0yNDY4NTRjOWM1N2MiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiRmluZGVzdEFkbWluaXN0cmF0b3IiLCJPd25lciJdLCJ0ZW5hbnRJZCI6IjA4ZGFlMjkzLWM1YjYtNGIxNC04MmNjLTNkNTIxYjdjN2UwOSIsInRlbmFudE5hbWUiOiJVbml2ZXJzZSBEZW1vIiwiaXNGaW5kZXN0VGVuYW50IjpmYWxzZSwicGVybWlzc2lvbnMiOlsiMDhkYWUyOTMtYzViNi00YjE0LTgyY2MtM2Q1MjFiN2M3ZTA5IiwiUmF0aW5nLlJlYWQiLCJSYXRpbmcuV3JpdGUiLCJSYXRpbmcuRGVsZXRlIiwiQ29tbWVudC5SZWFkIiwiQ29tbWVudC5Xcml0ZSIsIkNvbW1lbnQuRGVsZXRlIiwiTWF0dXJpdHlSYWRhci5SZWFkIiwiTWF0dXJpdHlSYWRhci5Xcml0ZSIsIk1hdHVyaXR5UmFkYXIuRGVsZXRlIiwiQWR2YW5jZWQiXSwiaWF0IjoxNzMxNDI1MDg4fQ.4vnV9YaO8nW_4JfHPGXBaO6M2jo_q8JlgPZ4qXBjUvQ";
        headers.set('authorization', `Bearer ${token}`);
        return headers;
      },
  }),
  endpoints: (builder) => ({
    createStudy: builder.mutation<Study, Partial<Study>>({
      query: (study) => ({
        url: '',
        method: 'POST',
        body: study,
      }),
    }),
    getStudies: builder.query<Study[], void>({
        query: () => ({
            url: 'study',
            params: {
              orderBy: 2,
              createdByMe:false
            }
        })
    }),
    getStudyById: builder.query<Study, number>({
      query: (id) => `/${id}`,
    }),

    updateStudyTitle: builder.mutation<Study, { id: number; title: string }>({
      query: ({ id, title }) => ({
        url: `/${id}/title`,
        method: 'PUT',
        body: { title },
      }),
    }),
    deleteStudy: builder.mutation<{ success: boolean; id: string }, number>({
      query: (id) => ({
          url: `/${id}`,
          method: 'DELETE',
      }),
  }),
  }),
});

export const { 
  useCreateStudyMutation,
  useGetStudiesQuery,
  useGetStudyByIdQuery,
  useUpdateStudyTitleMutation,
  useDeleteStudyMutation,
} = studyApi;