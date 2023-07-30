import Wrapper from "../assets/wrappers/ErrorPage"
import img from "../assets/images/not_found.svg"
import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>Ohh! Page Not Found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">back home</Link>
      </div>
    </Wrapper>
  )
}
export default ErrorPage
