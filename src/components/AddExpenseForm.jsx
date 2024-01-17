import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { groupMemberState } from "../states/GroupMembers";
import { expensesState } from "../states/Expense";

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
    <Form noValidate onSubmit={handleSubmit}>
      <h3>1. 비용 추가하기</h3>
      {() => console.log(expenses)}
      <Form.Group>
        <Form.Control
          type="date"
          placeholder="결제한 날짜를 선택해 주세요."
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
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
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="number"
          isValid={isAmountValid}
          isInvalid={!isAmountValid && validated}
          placeholder="비용은 얼마였나요"
          value={amount}
          onChange={({ target }) => setAmount(parseInt(target.value || 1))}
        />
      </Form.Group>
      <Form.Control.Feedback type="invalid" data-valid={isAmountValid}>
        금액을 입력해 주셔야 합니다.
      </Form.Control.Feedback>

      <Form.Group>
        <Form.Select
          defaultValue=""
          isValid={isPayerValid}
          isInvlaid={!isPayerValid && validated}
          onChange={({ target }) => setPayer(target.value)}
        >
          <option disabled value="">
            누가 결제 했나요?
          </option>
          {members.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Control.Feedback type="invalid" data-valid={isPayerValid}>
        결제자를 선택해 주셔야 합니다.
      </Form.Control.Feedback>
      <Button type="submit">추가하기</Button>
    </Form>
  );
};
