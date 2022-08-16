import styled from "styled-components";

const NewsWrapper = styled.div`
  margin: 0 175px 15px 175px;

  #flexible {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
  }
  @media screen and (max-width: 1000px) {
    margin: 0 15px 15px 15px;
  }
`;

export default NewsWrapper;
