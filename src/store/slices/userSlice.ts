import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, ServiceProvider } from '../../types';

interface UserState {
  profile: User | null;
  providerProfile: ServiceProvider | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  providerProfile: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
    },
    setProviderProfile: (state, action: PayloadAction<ServiceProvider>) => {
      state.providerProfile = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearUserData: (state) => {
      state.profile = null;
      state.providerProfile = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setProfile,
  setProviderProfile,
  updateProfile,
  setLoading,
  setError,
  clearUserData,
} = userSlice.actions;

export default userSlice.reducer;