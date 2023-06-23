import React from "react";
import styled from "styled-components";

const LogoContainer = styled.div`
  width: 100px;
`;

export default function Logo(props) {
  return (
    <LogoContainer>
      <img
        src={
          "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
        }
      />
    </LogoContainer>
  );
}
