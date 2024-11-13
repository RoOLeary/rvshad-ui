export interface AuthResponse {
    user: {
        id: string;
        email: string;
        name: string;
    };
    token: string;
}

export interface AuthState {
    user: AuthResponse['user'] | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

export interface User {
    user: string;
    id: string;
    email: string;
    name: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface DocumentData {
    abstract: string;
    id: string;
    title: string;
    name: string;
    type: string;
    dateAdded: string;
}

export interface DocumentListResponse {
    info: {
      count?: number;
      pages?: number;
      next?: string | null;
      prev?: string | null;
    };
    results: Document[];
  }
  
  export interface DocumentListResponseListQueryParams {
    id?: number;
    title?: string;
    url?: string;
    type?: string; 
    dateAdded?: string;
    abstract?:string;
  }

// Define interfaces for the API response
export interface SavedDocument {
    id: string;
    title: string;
    url: string;
    type: string;
    dateAdded: string;
    // Add other fields as needed
}

export interface SavedDocumentResponse {
    documents: SavedDocument[];
    total: number;
}