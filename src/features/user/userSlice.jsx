import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import customFetch from "../../customFetch"
import { toast } from "react-toastify"
import {
  clearLocalStorage,
  fetchFromLocalStorage,
  saveToLocalStorage,
} from "../../utils"
import { loginUserThunk, registerUserThunk, updateUserThunk } from "./userThunk"

const initialState = {
  isLoading: false,
  isBigSideBarOpen: false,
  user: fetchFromLocalStorage(),
}

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI)
  }
)

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI)
  }
)

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    return updateUserThunk("/auth/updateUser", user, thunkAPI)
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleBigSideBar: (state, action) => {
      state.isBigSideBarOpen = !state.isBigSideBarOpen
    },
    logOut: (state, action) => {
      state.user = null
      toast.success(action.payload, {
        position: "top-center",
      })
      clearLocalStorage()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        // console.log(action)
        state.isLoading = false
        state.user = action.payload.user
        saveToLocalStorage(action.payload.user)
        toast.success(`Hello There ${state.user.name}`, {
          position: "top-center",
        })
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload, {
          position: "top-center",
        })
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = { ...action.payload.user }
        saveToLocalStorage(action.payload.user)
        toast.success(`Welcome back! ${state.user.name}`, {
          position: "top-center",
        })
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload, {
          position: "top-center",
        })
      })
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = { ...action.payload }
        saveToLocalStorage(state.user)
        toast.success("Updated User", {
          position: "top-center",
        })
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload, {
          position: "top-center",
        })
      })
  },
})

export const { toggleBigSideBar, logOut } = userSlice.actions

export default userSlice.reducer
