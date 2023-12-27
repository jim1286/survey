import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  padding: 30px 0px;
  display: flex;
  flex-direction: column;
`;

export const MoveContainer = styled.div`
  cursor: move;
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
