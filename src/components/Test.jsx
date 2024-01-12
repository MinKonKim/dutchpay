import { Container, Row, Col } from "react-bootstrap";

export const Test = () => (
  <Container>
    <Row>
      <Col>
        <Row>
          <Col>Column A</Col>
          <Col>Column B</Col>
        </Row>
      </Col>
      <Col>Column 2</Col>
    </Row>
    <Row>
      <Col>Column 1</Col>
      <Col>Column 2</Col>
    </Row>
  </Container>
);
