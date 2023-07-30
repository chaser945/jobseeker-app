import { useDispatch, useSelector } from "react-redux"
import Wrapper from "../../assets/wrappers/DashboardFormPage"
import { FormRow } from "../../components"
import { useState } from "react"
import { toast } from "react-toastify"
import { updateUser } from "../../features/user/userSlice"
const Profile = () => {
  const { user, isLoading } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    name: user?.name || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    location: user?.location || "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, lastName, email, location } = userData
    if (!name || !lastName || !email || !location) {
      toast.error("Please! provide all the details", {
        position: "top-center",
      })
      return
    }
    dispatch(updateUser(userData))
  }
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            handleChange={handleChange}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "Submit"}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
export default Profile
