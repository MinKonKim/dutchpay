import { Col, Container, Row } from "react-bootstrap";
import { AddExpenseMain } from "./AddExpenseForm";
import { ExpenseTable } from "./ExpenseTable";
import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { GroupNameState } from "./../states/GroupName";
import { SettlementResult } from "./SettlementResult";
import { ServiceLogo } from "./shared/ServiceLogo";

export const ExpenseMain = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={5} md={4}>
          <LeftPane />
        </Col>
        <Col>
          <RightPane />
        </Col>
      </Row>
    </Container>
  );
};

const LeftPane = () => (
  <Container>
    <StyledGapRow>
      <Row>
        <ServiceLogo />
      </Row>
      <Row>
        <AddExpenseMain />
      </Row>
      <Row>
        <SettlementResult />
      </Row>
    </StyledGapRow>
  </Container>
);

const RightPane = () => {
  const groupName = useRecoilValue(GroupNameState);
  return (
    <StyledRightPaneWrapper>
      <Row>
        <StyledGroupName>{groupName || "그룹 이름"}</StyledGroupName>
      </Row>
      <Row>
        <ExpenseTable />
      </Row>
    </StyledRightPaneWrapper>
  );
};

const StyledGapRow = styled(Row)`
  gap: 5vh;
  padding-top: 100px;
  justify-content: center;
`;

const StyledRightPaneWrapper = styled(Container)`
  padding: 100px 31px 100px 31px;
`;

const StyledGroupName = styled.h2`
  margin-bottom: 75px;
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;
  text-align: center;
`;
