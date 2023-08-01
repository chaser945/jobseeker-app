import { FormRow, FormRowSelect } from "../components"
import Wrapper from "../assets/wrappers/SearchContainer"
import { useSelector, useDispatch } from "react-redux"
import { handleChange, clearFilters } from "../features/allJobs/allJobsSlice"
import { useState } from "react"
import { useMemo } from "react"

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("")
  const dispatch = useDispatch()
  const { search, searchStatus, searchType, sort, sortOptions, isLoading } =
    useSelector((store) => store.allJobs)
  const { statusOptions, jobTypeOptions } = useSelector((store) => store.job)
  // console.log(statusOptions, jobTypeOptions)
  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(clearFilters())
  }

  const debounce = () => {
    console.log("debounce")
    let timeOutId
    return (e) => {
      setLocalSearch(e.target.value)
      clearTimeout(timeOutId)
      timeOutId = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }))
      }, 1000)
    }
  }

  const optimizedDebounce = useMemo(() => debounce(), [])
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            optionsList={["all", ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            optionsList={["all", ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            optionsList={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
export default SearchContainer
