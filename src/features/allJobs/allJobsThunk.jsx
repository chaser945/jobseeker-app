import customFetch, { checkForUnauthorizedUser } from "../../customFetch"
import { logOut } from "../user/userSlice"
import { defaultAllJobsState } from "./allJobsSlice"
import { clearValues } from "../job/jobSlice"

export const fetchAllJobsThunk = async (_, thunkAPI) => {
  // console.log(thunkAPI.getState())
  const { search, searchStatus, searchType, sort, page } =
    thunkAPI.getState().allJobs
  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
  if (search) {
    url = url + `&search=${search}`
  }
  try {
    const response = await customFetch.get(url)
    // console.log("fetching all jobs")
    //   console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
    return checkForUnauthorizedUser(error, thunkAPI)
  }
}

export const fetchStatsThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get("/jobs/stats")
    // console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
    return checkForUnauthorizedUser(error, thunkAPI)
  }
}

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logOut(message))
    thunkAPI.dispatch(defaultAllJobsState())
    thunkAPI.dispatch(clearValues())
    return Promise.resolve()
  } catch (error) {
    return Promise.reject()
  }
}
