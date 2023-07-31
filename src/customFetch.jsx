import { fetchFromLocalStorage } from "./utils"
import axios from "axios"
import { clearStore } from "./features/allJobs/allJobsSlice"
const customFetch = axios.create({
  baseURL: " https://jobify-prod.herokuapp.com/api/v1/toolkit",
})

customFetch.interceptors.request.use((config) => {
  const user = fetchFromLocalStorage()
  if (user) {
    config.headers["Authorization"] = `Bearer ${user.token}`
  }
  return config
})
export default customFetch

export const checkForUnauthorizedUser = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore())
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...")
  }
  return thunkAPI.rejectWithValue(error.response.data.msg)
}
