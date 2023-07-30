import { NavBar, SideBarSmall, SideBarBig } from "../../components"
import { Outlet } from "react-router-dom"
import Wrapper from "../../assets/wrappers/SharedLayout.js"
const SharedLayout = () => {
  return (
    <>
      <Wrapper>
        <main className="dashboard">
          <SideBarSmall />
          <SideBarBig />
          <div>
            <NavBar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  )
}
export default SharedLayout
