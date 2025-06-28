import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = userCredential.user;

      return {
        uid: user.uid,
        email: user.email,
      
      };
    } catch (error) {
        console.error("Firebase login error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    isLoggedIn: false, 
  },
  reducers: {
    resetLoginState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.user = null;
      
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true; 
        state.error = null; 
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        console.log("Redux state updated: Login Fulfilled", state.user, state.isLoggedIn);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false; 
        state.error = action.payload; 
        state.user = null; 
        state.isLoggedIn = false; 
        console.log("Redux state updated: Login Rejected", state.error, state.isLoggedIn);
      });
  },
});

export const { resetLoginState } = loginSlice.actions;

