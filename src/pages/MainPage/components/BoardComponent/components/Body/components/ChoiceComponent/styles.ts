import { Checkbox } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  .ant-input {
    width: 100%;
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

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const RoundedCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    border-radius: 50% !important;
  }
`;

export const NumberWrap = styled.div`
  width: 17px;
`;
