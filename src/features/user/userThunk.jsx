import customFetch from "../../customFetch"
import { logOut } from "./userSlice"

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, user)
    // console.log(response.data)
    return response.data.user
  } catch (error) {
    console.log(error.response)
    if (error.response.status === 401) {
      // console.log(thunkAPI)
      thunkAPI.dispatch(logOut())
      return thunkAPI.rejectWithValue("Unauthorized! Please, Login again.")
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
