import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import {
  clearStoreThunk,
  fetchAllJobsThunk,
  fetchStatsThunk,
} from "./allJobsThunk"

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
  fetchAllJobsThunk
)

export const fetchStats = createAsyncThunk(
  "allJobs/fetchStats",
  fetchStatsThunk
)

export const clearStore = createAsyncThunk(
  "allJobs/clearStore",
  clearStoreThunk
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
      state.page = 1
      state[name] = value
    },
    clearFilters: (state, action) => {
      return { ...state, ...initialFiltersState }
    },
    changePage: (state, action) => {
      state.page = action.payload
    },
    defaultAllJobsState: (state) => {
      return { ...initialState }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.isLoading = false
        const { jobs, totalJobs, numOfPages } = action.payload
        state.jobs = jobs
        state.totalJobs = totalJobs
        state.numOfPages = numOfPages
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
      .addCase(fetchStats.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload, {
          position: "top-center",
        })
      })
      .addCase(clearStore.rejected, (state, action) => {
        toast.error("there was an error", {
          position: "top-center",
        })
      })
  },
})

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  defaultAllJobsState,
} = allJobsSlice.actions

export default allJobsSlice.reducer
