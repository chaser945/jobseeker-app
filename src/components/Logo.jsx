import styled from "styled-components"
const Logo = () => {
  return (
    <Wrapper>
      <h1 className="title">
        Job <span>Seeker</span>
      </h1>
    </Wrapper>
  )
}
export default Logo

const Wrapper = styled.div`
  .title {
    letter-spacing: 2px;
    font-weight: bold;
    font-size: 1.5rem;
    margin: 0;
  }

  .title {
    span {
      color: var(--primary-500);
    }
  }
`
