import { Checkbox } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  padding: 30px 0px;
  display: flex;
  flex-direction: column;
`;

export const RoundCheckBox = styled(Checkbox)`
  .ant-checkbox-inner {
    border-radius: 50% !important;
  }
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

export const ChoiceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  .ant-input {
    width: 100%;
  }
`;
