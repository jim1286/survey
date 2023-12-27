import styled from "styled-components";

export const Container = styled.div`
  width: 600px;
  min-height: 150px;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const TitleWrap = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;
`;

export const Label = styled.div`
  color: red;
`;

export const Body = styled.div`
  display: flex;
  flex: 1;
`;

export const ExplanationWrap = styled.div`
  width: 100%;
  font-size: 14px;
`;
