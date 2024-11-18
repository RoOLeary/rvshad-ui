import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { studyApi } from './study';
import { Study, StudyState } from '../../types/types'; 


const initialState: StudyState = {
    studies: [],
    selectedStudy: null,
    isLoading: false,
    error: null,
    filters: {
        id: '',
        title: '',
        type: '',
    },
};

const studySlice = createSlice({
    name: 'study',
    initialState,
    reducers: {
        // Set all entities
        setStudies: (state, action: PayloadAction<Study[]>) => {
            state.studies = action.payload;
            state.error = null;
        },
        
        // Set selected entity
        setSelectedStudy: (state, action: PayloadAction<Study | null>) => {
            state.selectedStudy = action.payload;
        },
        
        // Update filters
        setFilters: (state, action: PayloadAction<StudyState['filters']>) => {
            state.filters = {
                ...state.filters,
                ...action.payload,
            };
        },
        
        // Clear filters
        clearFilters: (state) => {
            state.filters = initialState.filters;
        },
        
        // Set loading state
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        
        // Set error state
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        
        // Clear entity state
        clearStudies: (state) => {
            state.studies = [];
            state.selectedStudy = null;
            state.filters = initialState.filters;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Handle API slice actions and match loading, success, and error states

        // Fetch all entities
        builder
            .addMatcher(
                studyApi.endpoints.getStudies.matchPending,
                (state) => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                studyApi.endpoints.getStudies.matchFulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.studies = action.payload;
                    state.error = null;
                }
            )
            .addMatcher(
                studyApi.endpoints.getStudies.matchRejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.error.message ?? 'Failed to fetch entities';
                }
            )

        // Fetch entity by ID
        builder
            .addMatcher(
                studyApi.endpoints.getStudyById.matchPending,
                (state) => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                studyApi.endpoints.getStudyById.matchFulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.selectedStudy = action.payload;
                    state.error = null;
                }
            )
            .addMatcher(
                studyApi.endpoints.getStudyById.matchRejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.error.message ?? 'Failed to fetch entity';
                }
            )

        // Create entity
        builder
            .addMatcher(
                studyApi.endpoints.createStudy.matchPending,
                (state) => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                studyApi.endpoints.createStudy.matchFulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.studies.push(action.payload);
                    state.error = null;
                }
            )
            .addMatcher(
                studyApi.endpoints.createStudy.matchRejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.error.message ?? 'Failed to create entity';
                }
            )

        // Update entity title
        builder
            .addMatcher(
                studyApi.endpoints.updateStudyTitle.matchPending,
                (state) => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                studyApi.endpoints.updateStudyTitle.matchFulfilled,
                (state, action) => {
                    state.isLoading = false;
                    const index = state.studies.findIndex((study) => study?.id === action.payload?.id);
                    if (index !== -1) {
                        state.studies[index] = action.payload; // Update the study title
                    }
                    state.error = null;
                }
            )
            .addMatcher(
                studyApi.endpoints.updateStudyTitle.matchRejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.error.message ?? 'Failed to update study title';
                }
            )

        // Delete entity
        builder
            .addMatcher(
                studyApi.endpoints.deleteStudy.matchPending,
                (state) => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                studyApi.endpoints.deleteStudy.matchFulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.studies = state.studies.filter((study) => study.id !== action.payload.id);
                    state.error = null;
                }
            )
            .addMatcher(
                studyApi.endpoints.deleteStudy.matchRejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.error.message ?? 'Failed to delete entity';
                }
            )
    }
});

// Export actions
export const {
    setStudies,
    setSelectedStudy,
    setFilters,
    clearFilters,
    setLoading,
    setError,
    clearStudies,
} = studySlice.actions;

// Export selectors
export const selectAllStudies = (state: { study: StudyState }) => state.study.studies;
export const selectSelectedStudy = (state: { study: StudyState }) => state.study.selectedStudy;
export const selectStudyFilters = (state: { study: StudyState }) => state.study.filters;
export const selectStudyLoading = (state: { study: StudyState }) => state.study.isLoading;
export const selectStudyError = (state: { study: StudyState }) => state.study.error;

// Export reducer
export default studySlice.reducer;
