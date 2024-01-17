import { useRecoilValue } from "recoil";
import { expensesState } from "../states/Expense";
import { Table } from "react-bootstrap";
import { OverlayWrapper } from "./shared/OverlayWrapper";
import { styled } from "styled-components";

export const ExpenseTable = () => {
  const expenses = useRecoilValue(expensesState);

  return (
    <OverlayWrapper minHeight={"73vh"}>
      <StyledTable data-testid="expenseList" borderless hover responsive>
        <thead>
          <tr>
            <th>날짜</th>
            <th>내용</th>
            <th>결제자</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(({ date, desc, amount, payer }, idx) => (
            <tr key={`expense-${idx}`}>
              <td>{date}</td>
              <td>{desc}</td>
              <td>{payer}</td>
              <td>{parseInt(amount)} 원</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </OverlayWrapper>
  );
};

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: black; /* 블루바이올렛 */

  th,
  td {
    padding: 0.5rem 0.5rem 0.5rem 0;
    text-align: center;
  }

  tr:nth-child(even) {
    background-color: #e6e6e6;
  }

  th {
    color: #4b0082;
    text-align: center;
    font-weight: 700;
    font-size: 24px;
  }

  td {
    vertical-align: middle;
    font-weight: 400;
    font-size: 20px;
  }
`;
