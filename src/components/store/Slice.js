
// gameSlice.js
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an initial state
const initialState = {
  data: {
    category: [], // Initialize as an empty array
    games: [],
  },
  isLoading: false,
  error: null,
};

// Define an async action to fetch games
// export const fetchGames = createAsyncThunk('game/fetchGames', async () => {
  export const fetchGames = createAsyncThunk('game/fetchGames', async () => {
    try {
      // Fetch data from an API or any source
      const response = await axios.get('https://api.panzcon.com/fetch-games');
      return response.data; // Access the data directly
    } catch (error) {
      throw error;
    }
  
});

// Create a game slice
const Slice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.isLoading = true; 
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default Slice.reducer;
