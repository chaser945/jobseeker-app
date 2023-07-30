import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchStats } from "../../features/allJobs/allJobsSlice"
import { StatsContainer, ChartsContainer, Loading } from "../../components"

const Stats = () => {
  const { monthlyApplications, isLoading } = useSelector(
    (store) => store.allJobs
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchStats())
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  )
}
export default Stats
