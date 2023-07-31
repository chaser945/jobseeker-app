import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi"
import Wrapper from "../assets/wrappers/PageBtnContainer"
import { useSelector, useDispatch } from "react-redux"
import { changePage } from "../features/allJobs/allJobsSlice"
const PageBtnContainer = () => {
  const dispatch = useDispatch()
  const { numOfPages, page } = useSelector((store) => store.allJobs)
  const prevPage = () => {
    let newPage = page - 1
    if (newPage < 1) {
      newPage = numOfPages
    }
    dispatch(changePage(newPage))
  }

  const nextPage = () => {
    let newPage = page + 1
    if (newPage > numOfPages) {
      newPage = 1
    }
    dispatch(changePage(newPage))
  }

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  })
  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((c) => {
          return (
            <button
              type="button"
              className={c === page ? "pageBtn active" : "pageBtn"}
              key={c}
              onClick={() => {
                dispatch(changePage(c))
              }}
            >
              {c}
            </button>
          )
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}
export default PageBtnContainer
