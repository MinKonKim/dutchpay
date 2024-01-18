import React from "react";
import { useRecoilValue } from "recoil";
import { expensesState } from "../states/Expense";
import { groupMemberState } from "../states/GroupMembers";

export const calculateMinimumTransaction = (
  expense,
  members,
  amountPerPerson
) => {
  const minTransactions = [];

  if (amountPerPerson === 0) {
    return minTransactions;
  }
  // 1. 사람별로 냈어야 할 금액
  const membersToPay = {};
  members.forEach((member) => {
    membersToPay[member] = amountPerPerson;
  });
  // 2. 사람별로 냈어야 할 금액 업데이트
  expense.forEach((payer, amount) => {
    membersToPay[payer] -= amount;
  });
  return minTransactions;
};

export const SettlementResult = () => {
  const expense = useRecoilValue(expensesState);
  const members = useRecoilValue(groupMemberState);

  const totalExpensseAmount = expense.reduce(
    (prevAmount, curExpense) => prevAmount + curExpense.amount,
    0
  );
  const groupMembersCount = members.length;
  const splitAmount = totalExpensseAmount / groupMembersCount;

  const minimumTransaction = [
    {
      receiver: "영수",
      sender: "영희",
      amount: "15000",
    },
  ];
  return (
    <div>
      <h3> 정산은 이렇게</h3>

      {totalExpensseAmount > 0 && groupMembersCount > 0 && (
        <>
          <span>
            {groupMembersCount}명에서 총 {totalExpensseAmount} 원 지출
          </span>
          <br />
          <span>한 사람당 {splitAmount}원</span>

          <ul>
            {minimumTransaction(({ sender, receiver, amount }, index) => (
              <li key={`trasaction-${index}`}>
                <span>
                  {sender}가 {receiver}에게 {amount}원 보내기{" "}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
