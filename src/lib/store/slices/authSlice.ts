import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

type Profile = Database["public"]["Tables"]["users"]["Row"];

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  profile: null,
  isLoading: true,
  error: null,
};

const supabase = createClient();

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (user: User, { rejectWithValue }) => {
    if (!user) return null;
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      if (error) throw error;
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);

export const refreshProfile = createAsyncThunk(
  "auth/refreshProfile",
  async (user: User, { rejectWithValue }) => {
    if (!user) return null;
    try {
      console.log("sliceに定義されたrefreshProfileを呼び出しました");
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      if (error) throw error;
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("unknown error");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.payload as string;
        state.profile = null;
      })
      .addCase(refreshProfile.fulfilled, (state, action) => {
        console.log("sliceに定義されたrefreshProfileがfulfilledです");
        state.profile = action.payload;
      })
      .addCase(refreshProfile.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;
