import styled from "styled-components";

interface IStyledHeader {
  isLoggedIn: boolean;
}

const StyledHeader = styled.div<IStyledHeader>`
  height: 80px;

  @media screen and (max-width: 409px) {
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
  }
  .toolbar {
    display: flex;
    justify-content: space-between;
    min-height: 64px;
  }
  #convertor-btn {
    color: ${(props) => (props.isLoggedIn ? "white" : "darkgray")};
    cursor: ${(props) => (props.isLoggedIn ? "pointer" : "not-allowed")};
  }
`;
export default StyledHeader;
