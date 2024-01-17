import { Form } from "react-bootstrap";
import { useSetRecoilState } from "recoil";
import { GroupNameState } from "../states/GroupName";
import { useState } from "react";
import { CenteredOverlayForm } from "./shared/CenteredOverlayForm";

export const CreateGroup = () => {
  const [validated, setValidated] = useState(false);
  const [validGroupName, setvalidGroupName] = useState(false);

  const setGroupName = useSetRecoilState(GroupNameState);

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
    <CenteredOverlayForm
      title="먼저, 더치 페이 할 그룹의 이름을 정해볼까요?"
      valdiated={validated}
      handleSubmit={handleSubmit}
    >
      {/* <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <StyledRow>
            <Row>
              <StyledH2>먼저, 더치 페이 할 그룹의 이름을 정해볼까요?</StyledH2>
            </Row>
            <Row> */}
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
        <Form.Control.Feedback type="invalid" data-valid={validGroupName}>
          그룹 이름을 입력해 주세요.
        </Form.Control.Feedback>
      </Form.Group>
      {/* </Row>
            <Row>
              <StyledSubmitButton>저장</StyledSubmitButton>
            </Row>
          </StyledRow>
        </Form>
      </Container> */}
    </CenteredOverlayForm>
  );
};
