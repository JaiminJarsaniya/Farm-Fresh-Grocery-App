
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '@/lib/types';
import { toast } from '@/components/ui/sonner';

interface FeedbackState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  reviews: [],
  loading: false,
  error: null,
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    fetchReviewsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchReviewsSuccess: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchReviewsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
      toast("Review submitted successfully");
    },
    updateReview: (state, action: PayloadAction<Review>) => {
      const index = state.reviews.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.reviews[index] = action.payload;
        toast("Review updated successfully");
      }
    },
    deleteReview: (state, action: PayloadAction<number>) => {
      state.reviews = state.reviews.filter(r => r.id !== action.payload);
      toast("Review deleted");
    },
  },
});

export const {
  fetchReviewsStart,
  fetchReviewsSuccess,
  fetchReviewsFailure,
  addReview,
  updateReview,
  deleteReview,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
