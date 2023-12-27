import styled from "styled-components";

interface ClickedProps {
  isClicked: boolean;
}

export const Container = styled.div<ClickedProps>`
  flex: 1;
  padding: 30px 0px;
  display: flex;
  flex-direction: column;
  border-bottom: ${(props) => props.isClicked && "1px solid lightgrey"};
`;

export const OptionContainer = styled.div`
  height: 35px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const MoveContainer = styled.div`
  cursor: move;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const NumberWrap = styled.div`
  width: 17px;
`;

export const ChoiceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  .ant-input {
    width: 100%;
  }
`;
