import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const user = userCredentials.user;
    
      return {
        uid: user.uid,
        email: user.email,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    authLoading: true,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    resetAuthState: (state) => {
      state.authLoading = false;
      state.error = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    setUser: (state, action) => {
      if (action.payload) {
        state.user = {
          uid: action.payload.uid,
          name: action.payload.displayName,
          email: action.payload.email,
        };
        state.isAuthenticated = true;
        state.authLoading = false;
      } else {
        state.user = null;
        state.isAuthenticated = false;
        state.authLoading = false;
      }
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
   
  },
  extraReducers: (builder) => {
    builder

      .addCase(signupUser.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.authLoading = true;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error=null
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.authLoading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })

      
  },
});

export const {
  resetAuthState,
  setUser,
  clearUser,
  setAuthLoading,
 
} = authSlice.actions;
