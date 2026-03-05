import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, AuthResponse } from "../../types";
import { authService } from "../../services/authService";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await authService.login(email, password);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      return await authService.register(firstName, lastName, email, password);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    clearError: (state) => { state.error = null; },
    setUser: (state, action: PayloadAction<User>) => { state.user = action.payload; },
  },
  extraReducers: (builder) => {
    const handleAuth = (state: AuthState, action: PayloadAction<AuthResponse>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    };
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, handleAuth)
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, handleAuth)
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;