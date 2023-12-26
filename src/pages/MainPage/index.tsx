import { BoardContainer, Container, ToolbarContainer } from "./styles";
import { Board } from "@/components";
import { Toolbar } from "./components";
import { nanoid } from "@reduxjs/toolkit";

function MainPage() {
  return (
    <Container>
      <BoardContainer>
        {[1, 2, 4, 4, 4, 4, 4, 4, 4, 4].map(() => (
          <Board key={nanoid()} />
        ))}
      </BoardContainer>
      <ToolbarContainer>
        <Toolbar />
      </ToolbarContainer>
    </Container>
  );
}

export default MainPage;
