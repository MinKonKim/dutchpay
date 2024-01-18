import React from "react";
import styled from "styled-components";

export const ServiceLogo = () => <StyledLogo>Dutch Pay</StyledLogo>;
const StyledLogo = styled.h1`
  font-family: "Lemon", "Roboto", sans-serif;
  font-weight: 200;
  font-size: 2.5em;
  margin-bottom: 0.25rem;
  letter-spacing: 3px;
  color: #6610f2;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
`;
