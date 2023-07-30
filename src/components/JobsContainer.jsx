import { createAsyncThunk } from "@reduxjs/toolkit"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Wrapper from "../assets/wrappers/JobsContainer"
import { fetchAllJobs } from "../features/allJobs/allJobsSlice"
import Job from "./Job"
import Loading from "./Loading"

const JobsContainer = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllJobs())
  }, [])

  const { jobs, isLoading } = useSelector((store) => store.allJobs)

  if (isLoading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    )
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>jobs info</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
    </Wrapper>
  )
}
export default JobsContainer
