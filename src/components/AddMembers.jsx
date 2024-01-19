import { CenteredOverlayForm } from "./shared/CenteredOverlayForm";
import { InputTags } from "react-bootstrap-tagsinput";
import { useRecoilState, useRecoilValue } from "recoil";
import { groupMemberState } from "../states/GroupMembers";
import { useState } from "react";
import { GroupNameState } from "../states/GroupName";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";

export const AddMembers = () => {
  const [groupMembers, setGroupMembers] = useRecoilState(groupMemberState);
  const groupName = useRecoilValue(GroupNameState) || undefined;
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidated(true);
    if (groupMembers.length > 0) {
      navigate(ROUTES.EXPENSES_MAIN);
    }
  };

  const header = `${groupName} 에 속한 사람들의 이름을 모두 적어주세요.`;
  return (
    <CenteredOverlayForm
      title={header}
      validated={validated}
      handleSubmit={handleSubmit}
    >
      <InputTags
        data-testid="input-memeber-names"
        placeholder="이름 간 띄어 쓰기"
        onTags={(value) => setGroupMembers(value.values)}
      />
      {validated && groupMembers.length === 0 && (
        <StyledErrorMessage>
          "그룹 멤버의 이름들을 입력해 주세요.
        </StyledErrorMessage>
      )}
    </CenteredOverlayForm>
  );
};

const StyledErrorMessage = styled.span`
  color: red;
`;
