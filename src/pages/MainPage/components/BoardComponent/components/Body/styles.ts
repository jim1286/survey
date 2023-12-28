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
