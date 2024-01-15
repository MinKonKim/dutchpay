import { Button, Container, Form, Row } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { GroupNameState } from "../states/GroupName";
import { useState } from "react";
import { CenteredOverlayForm } from "./CenteredOverlayForm";
import styled from "styled-components";

export const CreateGroup = () => {
  const [validated, setValidated] = useState(false);
  const [validGroupName, setvalidGroupName] = useState(false);

  const [groupName, setGroupName] = useRecoilState(GroupNameState);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      setvalidGroupName(true);
    } else {
      event.stopPropagation();
      setvalidGroupName(false);
    }
    setValidated(true);
  };

  return (
    <CenteredOverlayForm>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <StyledRow>
            <Row>
              <StyledH2>먼저, 더치 페이 할 그룹의 이름을 정해볼까요?</StyledH2>
            </Row>
            <Row>
              <Form.Group controlId="validationGroupName">
                <Form.Control
                  type="text"
                  required
                  placeholder="2022 제주도 여행"
                  onChange={(e) => {
                    setGroupName(e.target.value);
                  }}
                  isValid={validated}
                />
                <Form.Control.Feedback
                  type="invalid"
                  data-valid={validGroupName}
                >
                  그룹 이름을 입력해 주세요.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <StyledSubmitButton>저장</StyledSubmitButton>
            </Row>
          </StyledRow>
        </Form>
      </Container>
    </CenteredOverlayForm>
  );
};

const StyledSubmitButton = styled(Button).attrs({
  type: "submit",
})`
  background-color: #6610f2;
  border-radius: 8px;
  border: none;

  &:hover {
    background-color: #6610f2;
    filter: brightness(80%);
  }
`;
const StyledRow = styled(Row)`
  align-items: center;
  justify-content: center;
  height: 60vh;
`;
const StyledH2 = styled.h2`
  font-weight: 700;
  line-height: 35px;

  text-align: right;
  overflow-wrap: break-word;
  word-break: keep-all;
`;
