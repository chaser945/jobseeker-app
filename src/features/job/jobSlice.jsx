import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import customFetch from "../../customFetch"
import { fetchAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice"
import { logOut } from "../user/userSlice"
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk"

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
}

export const createJob = createAsyncThunk("job/createJob", createJobThunk)

export const deleteJob = createAsyncThunk("job/deleteJob", deleteJobThunk)

export const editJob = createAsyncThunk("job/editJob", editJobThunk)

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, action) => {
      console.log(action)
      const { name, value } = action.payload
      state[name] = value
    },
    clearValues: (state, action) => {
      //   console.log(state)
      return {
        ...initialState,
      }
    },
    setEditJob: (state, action) => {
      return { ...state, isEditing: true, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false
        toast.success("Job Created", {
          position: "top-center",
        })
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload)
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        toast.success("Job deleted", {
          position: "top-center",
        })
      })
      .addCase(deleteJob.rejected, (state, action) => {
        toast.error("Couldn't delete job", {
          position: "top-center",
        })
      })
      .addCase(editJob.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.isLoading = false
        toast.success("Job Modified...", {
          position: "top-center",
        })
      })
      .addCase(editJob.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload, {
          position: "top-center",
        })
      })
  },
})

export const { handleChange, clearValues, setEditJob } = jobSlice.actions
// console.log(handleChange)
// console.log(jobSlice.actions)

export default jobSlice.reducer
