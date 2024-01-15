import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateGroup } from "./components/CreateGroup";
import { AddMembers } from "./components/AddMembers";
import { ExpenseMain } from "./components/ExpenseMain";
import { Test } from "./components/Test";
import { RecoilRoot } from "recoil";
import "bootstrap/dist/css/bootstrap.min.css";
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
