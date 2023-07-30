import { IoBarChartSharp } from "react-icons/io5"
import { MdQueryStats } from "react-icons/md"
import { FaWpforms } from "react-icons/fa"
import { ImProfile } from "react-icons/im"

export const links = [
  {
    id: 1,
    text: "stats",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "all jobs",
    path: "all-jobs",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: "add job",
    path: "add-job",
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
]

export const saveToLocalStorage = (data) => {
  localStorage.setItem("user", JSON.stringify(data))
}

export const fetchFromLocalStorage = (data) => {
  const userData = localStorage.getItem("user")
  if (userData) {
    return { ...JSON.parse(userData) }
  }
  return null
}

export const clearLocalStorage = () => {
  localStorage.clear()
}
