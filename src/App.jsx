import { LandingPage, ErrorPage, RegisterPage, ProtectedRoute } from "./Pages"
import {
  Stats,
  AddJob,
  AllJobs,
  Profile,
  SharedLayout,
} from "./Pages/Dashboard"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Stats />} />
            <Route path="add-job" element={<AddJob />} />
            <Route path="all-jobs" element={<AllJobs />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="landing" element={<LandingPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}
export default App
