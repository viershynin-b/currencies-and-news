import styled from "styled-components";

interface IStyledHeader {
  isLoggedIn: boolean;
}

const StyledHeader = styled.div<IStyledHeader>`
  height: 80px;
  @media screen and (max-width: 599px) {
    height: 70px;
  }
  @media screen and (max-width: 369px) {
    height: 90px;
  }
  a {
    margin: 0 10px 0 0;
    padding: 5px 0px 6px 0px;
    text-decoration: none;
  }
  button {
    color: white;
  }
  .active,
  a:hover {
    border-bottom: ${(props) =>
      props.isLoggedIn ? "1.5px solid white" : "none"};
    /* border-radius: 10px;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3); */
  }
  .toolbar {
    display: flex;
    justify-content: space-between;
  }
  #convertor-btn {
    color: ${(props) => (props.isLoggedIn ? "white" : "darkgray")};
    cursor: ${(props) => (props.isLoggedIn ? "pointer" : "not-allowed")};
  }
`;
export default StyledHeader;
