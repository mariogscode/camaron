import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Service, ServiceCategory, ServiceProvider, SearchFilters, SearchResult } from '../../types';

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

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ServiceCategory[]>) => {
      state.categories = action.payload;
    },
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
    setProviders: (state, action: PayloadAction<ServiceProvider[]>) => {
      state.providers = action.payload;
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearServiceData: (state) => {
      state.searchResults = null;
      state.searchFilters = {};
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setCategories,
  setServices,
  setProviders,
  setSearchResults,
  updateSearchFilters,
  clearSearchFilters,
  setLoading,
  setError,
  clearServiceData,
} = serviceSlice.actions;

export default serviceSlice.reducer;