import Wrapper from "../assets/wrappers/SmallSidebar"
import { FaTimes } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import Logo from "./Logo"
import { useSelector, useDispatch } from "react-redux"
import { toggleBigSideBar } from "../features/user/userSlice"
import NavLinks from "./NavLinks"
const SideBarSmall = () => {
  const dispatch = useDispatch()
  const { isBigSideBarOpen } = useSelector((store) => store.user)
  const toggle = () => {
    dispatch(toggleBigSideBar())
  }
  return (
    <Wrapper>
      <div
        className={`${
          isBigSideBarOpen
            ? "sidebar-container show-sidebar"
            : "sidebar-container"
        }`}
      >
        <div className="content">
          <button className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header style={{ marginBottom: "1.5em" }}>
            <Logo />
          </header>
          <NavLinks toggle={toggle} />
        </div>
      </div>
    </Wrapper>
  )
}
export default SideBarSmall
