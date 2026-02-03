import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Booking, BookingStatus } from '../../types';

interface BookingState {
  currentBooking: Partial<Booking> | null;
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  currentBooking: null,
  bookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setCurrentBooking: (state, action: PayloadAction<Partial<Booking>>) => {
      state.currentBooking = action.payload;
    },
    updateCurrentBooking: (state, action: PayloadAction<Partial<Booking>>) => {
      if (state.currentBooking) {
        state.currentBooking = { ...state.currentBooking, ...action.payload };
      } else {
        state.currentBooking = action.payload;
      }
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.unshift(action.payload);
    },
    updateBookingStatus: (state, action: PayloadAction<{ bookingId: string; status: BookingStatus }>) => {
      const booking = state.bookings.find(b => b.id === action.payload.bookingId);
      if (booking) {
        booking.status = action.payload.status;
        booking.updatedAt = new Date();
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearBookingData: (state) => {
      state.currentBooking = null;
      state.bookings = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setCurrentBooking,
  updateCurrentBooking,
  clearCurrentBooking,
  setBookings,
  addBooking,
  updateBookingStatus,
  setLoading,
  setError,
  clearBookingData,
} = bookingSlice.actions;

export default bookingSlice.reducer;