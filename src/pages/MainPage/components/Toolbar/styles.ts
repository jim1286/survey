import styled from "styled-components";
import { Position } from ".";

interface ContainerProps {
  position: Position;
}

export const Container = styled.div.attrs<ContainerProps>((props) => ({
  style: {
    width: "50px",
    height: "50px",
    backgroundColor: "white",
    borderRadius: "5px",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    top: props.position.top && `${props.position.top}px`,
    bottom: props.position.bottom && `${props.position.bottom}px`,
  },
}))``;
