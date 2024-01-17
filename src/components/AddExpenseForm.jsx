import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { groupMemberState } from "../states/GroupMembers";
import { expensesState } from "../states/Expense";
import { styled } from "styled-components";

export const AddExpenseMain = () => {
  const members = useRecoilValue(groupMemberState);

  const today = new Date();
  const [date, setDate] = useState(
    [today.getFullYear(), today.getMonth() + 1, today.getDate()].join("-")
  );
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [payer, setPayer] = useState(null);
  const [validated, setValidated] = useState(false);

  const [isDescValid, setIsDescValid] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(false);
  const [isPayerValid, setIsPayerValid] = useState(false);
  const setExpense = useSetRecoilState(expensesState);

  const expenses = useRecoilValue(expensesState);

  const checkFormValidity = () => {
    const descValid = desc.length > 0;
    const payerValid = payer !== null;
    const amountValid = amount > 0;

    setIsDescValid(descValid);
    setIsPayerValid(payerValid);
    setIsAmountValid(amountValid);

    return descValid && payerValid && amountValid;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkFormValidity()) {
      const newExpense = {
        date,
        desc,
        amount,
        payer,
      };

      setExpense((expense) => [...expense, newExpense]);
    }
    setValidated(true);
  };

  return (
    <StyledWrapper>
      <Form noValidate onSubmit={handleSubmit}>
        <StyledTitle>1. 비용 추가하기</StyledTitle>
        <Row>
          <Col xs={12}>
            <StyledFormGroup>
              <Form.Control
                type="date"
                placeholder="결제한 날짜를 선택해 주세요."
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <StyledFormGroup>
              <Form.Control
                type="text"
                isValid={isDescValid}
                isInvalid={!isDescValid && validated}
                placeholder="비용에 대한 설명을 입력해 주셔야 합니다."
                value={desc}
                onChange={({ target }) => setDesc(target.value)}
              />
              <Form.Control.Feedback type="invalid" data-valid={isDescValid}>
                비용 내용을 입력해 주셔야 합니다.
              </Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Control
                type="number"
                isValid={isAmountValid}
                isInvalid={!isAmountValid && validated}
                placeholder="비용은 얼마였나요"
                value={amount}
                onChange={({ target }) =>
                  setAmount(parseInt(target.value || 1))
                }
              />
            </StyledFormGroup>
            <Form.Control.Feedback type="invalid" data-valid={isAmountValid}>
              금액을 입력해 주셔야 합니다.
            </Form.Control.Feedback>
          </Col>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Select
                defaultValue=""
                isValid={isPayerValid}
                isInvlaid={!isPayerValid && validated}
                onChange={({ target }) => setPayer(target.value)}
                className="form-control"
              >
                <option disabled value="">
                  누가 결제 했나요?
                </option>
                <option>영수</option>
                {members.map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </Form.Select>
            </StyledFormGroup>
            <Form.Control.Feedback type="invalid" data-valid={isPayerValid}>
              결제자를 선택해 주셔야 합니다.
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="d-grid gap-2">
            <StyledSubmitButton>추가하기</StyledSubmitButton>
          </Col>
        </Row>
      </Form>
    </StyledWrapper>
  );
};

const StyledTitle = styled.h3`
  color: #fffbfb;
  text-align: center;
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  margin-bottom: 15px;
`;

const StyledWrapper = styled.div`
  padding: 50px;
  background-color: #683ba1;
  box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`;

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 15px;

  input,
  select {
    background: #59359a;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: 0px;
    color: #f8f9fa;
    height: 45px;

    &:focus {
      color: #f8f9fa;
      background: #59359a;
      filter: brightness(80%);
    }
    &::placeholder {
      color: #f8f9fa;
    }
  }
`;
const StyledSubmitButton = styled(Button).attrs({
  type: "submit",
})`
  height: 60px;
  border: 0px;
  border-radius: 8px;
  background-color: #e2d9f3;
  color: #59359a;
  padding: 16px, 32px;
  margin-top: 10px;

  &:hover,
  &:focus {
    background-color: #e2d9f3;
    filter: brightness(88%);
  }
`;
