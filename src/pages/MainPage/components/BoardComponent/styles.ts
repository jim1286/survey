import styled from "styled-components";

interface ClickedProps {
  isClicked: boolean;
}

export const Container = styled.div<ClickedProps>`
  min-width: 600px;
  width: 100%;
  min-height: 150px;
  padding: 20px;
  border: 1px solid gray;
  border-left: ${(props) => props.isClicked && "5px solid skyblue"};
  border-radius: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const MoveContainer = styled.div`
  display: flex;
  justify-content: center;
  cursor: move;
`;

export const Spacer = styled.div`
  width: 100%;
  height: 24px;
`;

export const Body = styled.div<ClickedProps>`
  display: flex;
  flex: 1;
  border-bottom: ${(props) => props.isClicked && "1px solid gray"};
`;

export const ExplanationWrap = styled.div`
  width: 100%;
`;
