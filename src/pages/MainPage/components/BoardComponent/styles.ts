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
`;

export const Body = styled.div<ClickedProps>`
  display: flex;
  flex: 1;
  border-bottom: ${(props) => props.isClicked && "1px solid gray"};
`;

export const Footer = styled.div`
  width: 100%;
  height: 50px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 20px;
`;

export const Necessary = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Divider = styled.div`
  height: 100%;
  border-right: 1px solid gray;
`;
