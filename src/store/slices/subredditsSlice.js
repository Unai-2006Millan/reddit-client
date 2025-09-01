import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk para cargar los subreddits
export const fetchSubreddits = createAsyncThunk('subreddits/fetchSubreddits', async () => {
  const response = await axios.get('/api/subreddits.json');
  return response.data.data.children;
});

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState: {
    subreddits: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subreddits = action.payload;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export default subredditsSlice.reducer;