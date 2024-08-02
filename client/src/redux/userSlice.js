import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAxiosInstance as axios } from "../utils/axios";

export const updateUser = createAsyncThunk("user/updateUser", async (user, thunkAPI) => {
  try {
    const response = await axios.put(`/user/${user.user_id}`, user);
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const changePassword = createAsyncThunk("user/changePassword", async (passwords, thunkAPI) => {
  try {
    const response = await axios.post(`/user/${passwords.user_id}/change-password`, passwords);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
