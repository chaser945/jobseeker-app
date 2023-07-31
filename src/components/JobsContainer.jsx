import { createAsyncThunk } from "@reduxjs/toolkit"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Wrapper from "../assets/wrappers/JobsContainer"
import { fetchAllJobs } from "../features/allJobs/allJobsSlice"
import Job from "./Job"
import Loading from "./Loading"
import PageBtnContainer from "./PageBtnContainer"

const JobsContainer = () => {
  const dispatch = useDispatch()
  const { search, searchStatus, searchType, sort, page } = useSelector(
    (store) => store.allJobs
  )

  useEffect(() => {
    dispatch(fetchAllJobs())
  }, [search, searchStatus, searchType, sort, page])

  const { jobs, isLoading, totalJobs, numOfPages } = useSelector(
    (store) => store.allJobs
  )

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
      <h5>
        {totalJobs} Job{totalJobs > 1 && "s"} Found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}
export default JobsContainer
