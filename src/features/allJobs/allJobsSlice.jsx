import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import customFetch from "../../customFetch"

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
}

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
}

export const fetchAllJobs = createAsyncThunk(
  "allJobs/fetchAllJobs",
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get("/jobs")
      // console.log("fetching all jobs")
      //   console.log(response)
      return response.data.jobs
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const fetchStats = createAsyncThunk(
  "allJobs/fetchStats",
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get("/jobs/stats")
      // console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
      thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state, action) => {
      state.isLoading = true
    },
    hideLoading: (state, action) => {
      state.isLoading = false
    },
    handleChange: (state, action) => {
      // console.log(action.payload)
      const { name, value } = action.payload
      state[name] = value
    },
    clearFilters: (state, action) => {
      return { ...state, ...initialFiltersState }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.jobs = action.payload
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload, {
          position: "top-center",
        })
      })
      .addCase(fetchStats.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.isLoading = false
        state.stats = action.payload.defaultStats
        state.monthlyApplications = action.payload.monthlyApplications
      })
      .addCase(fetchStats.rejected),
      (state, action) => {
        state.isLoading = false
        toast.error(action.payload, {
          position: "top-center",
        })
      }
  },
})

export const { showLoading, hideLoading, handleChange, clearFilters } =
  allJobsSlice.actions

export default allJobsSlice.reducer
