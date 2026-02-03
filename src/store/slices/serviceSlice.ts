import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Service, ServiceCategory, ServiceProvider, SearchFilters, SearchResult } from '../../types';
import { firebaseService } from '../../services/api/firebaseService';

interface ServiceState {
  categories: ServiceCategory[];
  services: Service[];
  providers: ServiceProvider[];
  searchResults: SearchResult | null;
  searchFilters: SearchFilters;
  loading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  categories: [],
  services: [],
  providers: [],
  searchResults: null,
  searchFilters: {},
  loading: false,
  error: null,
};

// Async Thunks para conectar con Firebase/API
export const fetchServiceCategories = createAsyncThunk(
  'service/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const result = await firebaseService.getServiceCategories();
      if (!result.success) {
        return rejectWithValue(result.error);
      }
      return result.categories!;
    } catch (error) {
      return rejectWithValue('Error de conexión');
    }
  }
);

export const fetchProvidersByCategory = createAsyncThunk(
  'service/fetchProvidersByCategory',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const result = await firebaseService.getProvidersByCategory(categoryId);
      if (!result.success) {
        return rejectWithValue(result.error);
      }
      return result.providers!;
    } catch (error) {
      return rejectWithValue('Error de conexión');
    }
  }
);

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<SearchResult>) => {
      state.searchResults = action.payload;
    },
    updateSearchFilters: (state, action: PayloadAction<Partial<SearchFilters>>) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload };
    },
    clearSearchFilters: (state) => {
      state.searchFilters = {};
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Service Categories
    builder
      .addCase(fetchServiceCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchServiceCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
    // Fetch Providers by Category
    builder
      .addCase(fetchProvidersByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProvidersByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload;
        state.error = null;
      })
      .addCase(fetchProvidersByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setServices,
  setSearchResults,
  updateSearchFilters,
  clearSearchFilters,
  clearError,
} = serviceSlice.actions;

export default serviceSlice.reducer;