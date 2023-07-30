import Wrapper from "../assets/wrappers/BigSidebar"
import Logo from "./Logo"
import NavLinks from "./NavLinks"
import { useSelector } from "react-redux"
const SideBarBig = () => {
  const { isBigSideBarOpen } = useSelector((store) => store.user)
  return (
    <Wrapper>
      <div
        className={
          isBigSideBarOpen
            ? "sidebar-container"
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}
export default SideBarBig
