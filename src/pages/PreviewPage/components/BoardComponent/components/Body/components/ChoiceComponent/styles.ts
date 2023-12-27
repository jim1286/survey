import { Checkbox } from "antd";
import styled from "styled-components";

interface TypeProps {
  rounded: boolean;
}

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

export const TypeCheckbox = styled(Checkbox)<TypeProps>`
  .ant-checkbox-inner {
    border-radius: ${(props) => props.rounded && "50% !important"};
  }
`;
