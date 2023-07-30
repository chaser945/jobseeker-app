import customFetch from "../../customFetch"
import { showLoading, hideLoading, fetchAllJobs } from "../allJobs/allJobsSlice"
import { clearValues } from "./jobSlice"

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const response = await customFetch.post("/jobs", job)
    return response.data
  } catch (error) {
    console.log(error.response)
    if (error.status === 401) {
      thunkAPI.dispatch(logOut())
      return thunkAPI.rejectWithValue("Unauthorized! Please, Login again.")
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  try {
    const response = await customFetch.delete(`jobs/${jobId}`)
    thunkAPI.dispatch(fetchAllJobs())
    console.log(response)
    return response.data
  } catch (error) {
    thunkAPI.dispatch(hideLoading())
    console.log(error)
    thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const response = await customFetch.patch(`jobs/${jobId}`, job)
    thunkAPI.dispatch(clearValues())
    return response.data
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
