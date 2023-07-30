import { Link } from "react-router-dom"
import main from "../assets/images/undraw_multitasking.svg"
import Wrapper from "../assets/wrappers/LandingPage"
import { Logo } from "../components/index"
const LandingPage = () => {
  return (
    <Wrapper>
      <main>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          {/* info */}
          <div className="info">
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              Occupy truffaut letterpress cupping tilde chicharrones small batch
              gatekeep taiyaki heirloom marfa praxis. Pok pok semiotics godard
              biodiesel. Keytar godard hell of, kombucha gluten-free normcore
              raw denim bushwick leggings pabst solarpunk. Tonx fixie gentrify
              readymade kogi jawn, enamel pin waistcoat umami.
            </p>
            <button className="btn btn-hero">
              <Link className="btn-hero-link" to="/register">
                Login/Register
              </Link>
            </button>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </main>
    </Wrapper>
  )
}

export default LandingPage
