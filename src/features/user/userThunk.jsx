import customFetch, { checkForUnauthorizedUser } from "../../customFetch"
import { logOut } from "./userSlice"

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user)
    return response.data
  } catch (error) {
    return checkForUnauthorizedUser(error, thunkAPI)
  }
}

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user)
    return response.data
  } catch (error) {
    return checkForUnauthorizedUser(error, thunkAPI)
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
    return checkForUnauthorizedUser(error, thunkAPI)
  }
}
