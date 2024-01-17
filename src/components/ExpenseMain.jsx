import { AddExpenseMain } from "./AddExpenseForm";
import { ExpenseTable } from "./ExpenseTable";

export const ExpenseMain = () => {
  return (
    <div>
      <div>
        {/*Left Pane */}
        <AddExpenseMain />
      </div>
      <div>
        {/*Right Pane */}
        <ExpenseTable />
      </div>
    </div>
  );
};
