import { Button, Container, Form, Row } from "react-bootstrap";
import CenteredOverlayForm from "./CenteredOverlayForm";
import { useRecoilState } from "recoil";
import { GroupNameState } from "../states/GroupName";

export const CreateGroup = () => {
  const [groupName, setGroupNmae] = useRecoilState(GroupNameState);

  return (
    <div>
      <h1>Dutch Pay</h1>

      <Container>
        <Form noValidate>
          <Row>
            <h2>먼저, 더치 페이 할 그룹의 이름을 정해볼까요?</h2>
          </Row>
          <Row>
            <Form.Group controlId="validationGroupName">
              <Form.Control
                type="text"
                required
                placeholder="2022 제주도 여행"
              />
              <Form.Control.Feedback type="invalid">
                그룹 이름을 입력해 주세요.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Button type="submit">저장</Button>
          </Row>
        </Form>
      </Container>

      {/* <CenteredOverlayForm /> */}
    </div>
  );
};
