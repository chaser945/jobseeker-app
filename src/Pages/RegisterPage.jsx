import { useState } from "react"
import Wrapper from "../assets/wrappers/RegisterPage"
import { Logo, FormRow } from "../components"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { registerUser, loginUser } from "../features/user/userSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector((store) => store.user)
  const navigate = useNavigate()
  // console.log(user)

  useEffect(() => {
    if (user) {
      const timeOutId = setTimeout(() => {
        navigate("/")
      }, 2000)
      return () => clearTimeout(timeOutId)
    }
  }, [user])

  const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: false,
  }

  const [values, setValues] = useState(initialState)

  const handleChange = (e) => {
    const name = e.target.name
    setValues((prevState) => {
      return { ...prevState, [name]: e.target.value }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    if (!password || !email || (!isMember && !name)) {
      toast.error("Please provide all the inputs", {
        position: toast.POSITION.TOP_CENTER,
      })
      return
    }
    if (isMember) {
      dispatch(loginUser({ email, password }))
      return
    }
    dispatch(registerUser({ name, email, password }))
  }

  const toggleMember = () => {
    setValues((prevState) => {
      return { ...prevState, isMember: !prevState.isMember }
    })
  }

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "login" : "register"}</h3>

        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            labelText="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email field */}
        <FormRow
          type="email"
          name="email"
          labelText="email"
          value={values.email}
          handleChange={handleChange}
        />

        {/* password field */}
        <FormRow
          type="password"
          name="password"
          labelText="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button className="btn btn-block" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            dispatch(
              loginUser({ email: "testUser@test.com", password: "secret" })
            )
          }}
        >
          {isLoading ? "loading..." : "demo app"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button className="member-btn" type="button" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}
export default RegisterPage
