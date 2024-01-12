import userEvent from "@testing-library/user-event";
import { CreateGroup } from "./CreateGroup";
import { render, screen } from "@testing-library/react";

const renderComponent = () => {
  render(<CreateGroup />);

  const input = screen.getByPlaceholderText(`2022 제주도 여행`);
  const saveButton = screen.getByText(`저장`);
  const errorMessage = screen.getByText("그룹 이름을 입력해 주세요.");

  return {
    input,
    saveButton,
    errorMessage,
  };
};

describe("그룹 생성 페이지", () => {
  test("그룹 이름 입력 컴포넌트가 랜더링 되는가", () => {
    const { input, saveButton } = renderComponent();
    //Todo: input Component
    expect(input).not.toBeNull();
    //Todo: save button
    expect(saveButton).not.toBeNull();
  });
  test("그룹 이름을 입력하지 않고, 저장 버튼을 클릭시 에러메시지 노출", async () => {
    const { errorMessage, saveButton } = renderComponent();
    await userEvent.click(saveButton);
    expect(errorMessage).not.toBeNull();
  });

  test("그룹 이름을 입력 후 저장버튼 클릭시, 저장성공", async () => {
    const { input, saveButton, errorMessage } = renderComponent();

    // 어떤 element에 어떤 text를 입력할건지
    await userEvent.type(input, "예시 그룹명");
    await userEvent.click(saveButton);

    expect(errorMessage).toBeNull();
  });
});
