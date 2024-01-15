import { Container } from "react-bootstrap";
import styled from "styled-components";
import { OverlayWrapper } from "./shared/OverlayWrapper";

export const CenteredOverlayForm = ({ children }) => {
  return (
    <StyledCentralizedContainer>
      <StyledHeader>Dutch Pay</StyledHeader>
      <OverlayWrapper>{children}</OverlayWrapper>
    </StyledCentralizedContainer>
  );
};

const StyledHeader = styled.h1`
  font-family: "Roboto", sans-serif;
  font-weight: 200;
  font-size: 2.5em;
  margin-bottom: 0.25rem;
  letter-spacing: 10px;
  color: #6610f2;
`;

const StyledCentralizedContainer = styled(Container)`
  width: 50vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;
`;
