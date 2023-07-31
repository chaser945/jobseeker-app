import Wrapper from "../assets/wrappers/Navbar"
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa"
import Logo from "./logo"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleBigSideBar, logOut } from "../features/user/userSlice"
import { clearStore } from "../features/allJobs/allJobsSlice"
const NavBar = () => {
  const { user } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const [showLogout, setShowLogout] = useState(false)
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => {
            dispatch(toggleBigSideBar())
          }}
        >
          <FaAlignLeft />
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.6em",
          }}
        >
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => {
              setShowLogout(!showLogout)
            }}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div
            className={`${showLogout ? "dropdown show-dropdown" : "dropdown"}`}
          >
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => {
                dispatch(clearStore("Logged Out!"))
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default NavBar
