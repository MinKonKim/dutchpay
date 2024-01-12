import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateGroup } from "./components/CreateGroup";
import { AddMembers } from "./components/AddMembers";
import { ExpenseMain } from "./components/ExpenseMain";
import { Test } from "./components/Test";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateGroup />} />
          <Route path="members" element={<AddMembers />} />
          <Route path="expense" element={<ExpenseMain />} />
          <Route path="test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
