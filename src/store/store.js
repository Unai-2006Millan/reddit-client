import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import subredditsReducer from './slices/subredditsSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    subreddits: subredditsReducer,
  },
});

export default store;