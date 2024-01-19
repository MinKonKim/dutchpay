import React from "react";
import { useRecoilValue } from "recoil";
import { expensesState } from "../states/Expense";
import { groupMemberState } from "../states/GroupMembers";
import { styled } from "styled-components";
import { StyledTitle } from "./AddExpenseForm";

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

  // 3.
  const sortedMembersToPay = Object.keys(membersToPay)
    .map((member) => ({ member: member, amount: membersToPay[member] }))
    .sort((a, b) => a.amount - b.amount);

  var left = 0;
  var right = sortedMembersToPay.length - 1;

  while (left < right) {
    while (sortedMembersToPay[left].amount === 0) {
      left++;
    }
    while (sortedMembersToPay[right].amount === 0) {
      right--;
    }
    const toReceive = sortedMembersToPay[left];
    const toSend = sortedMembersToPay[right];
    const amountToReceive = Math.abs(toReceive.amount);
    const amountToSend = Math.abs(toSend.amount);

    if (amountToSend <= amountToReceive) {
      minTransactions.push({
        receiver: toReceive.member,
        sender: toSend.member,
        amount: amountToReceive,
      });

      toReceive.amount = 0;
      toSend.amount -= amountToReceive;
      left++;
    } else {
      minTransactions.push({
        receiver: toReceive.member,
        sender: toSend.member,
        amount: amountToSend,
      });
      toSend.amount = 0;
      toReceive.amount += amountToSend;
      right--;
    }
  }

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

  const minimumTransaction = calculateMinimumTransaction(
    expense,
    members,
    splitAmount
  );
  return (
    <StyledWrapper>
      <StyledTitle> 정산은 이렇게</StyledTitle>

      {totalExpensseAmount > 0 && groupMembersCount > 0 && (
        <>
          <StyledSummery>
            <span>
              {groupMembersCount}명에서 총 {totalExpensseAmount} 원 지출
            </span>
            <br />
            <span>한 사람당 {splitAmount}원</span>
          </StyledSummery>

          <StyledUl>
            {minimumTransaction.map(({ sender, receiver, amount }, index) => (
              <li key={`transaction-${index}`}>
                <span>
                  {sender}(이)가 {receiver}에게 {amount}원 보내기{" "}
                </span>
              </li>
            ))}
          </StyledUl>
        </>
      )}
    </StyledWrapper>
  );
};

const StyledSummery = styled.div`
  margin-top: 31px;
`;
const StyledWrapper = styled.div`
  padding: 50px;
  background-color: #683ba1;
  color: #fffbfb;
  box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  text-align: center;
  font-size: 22px;
`;
const StyledUl = styled.ul`
  margin-top: 3px;
  font-weight: 600;
  line-height: 48px;

  list-style-type: none;
  li::before {
    content: "▶";
    display: inline-block;
    width: 1em;
    margin-left: -2.5em;
    margin-right: 4px;
    animation: blinker 1.5s linear infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;
