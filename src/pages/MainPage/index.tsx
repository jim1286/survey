import { BoardContainer, Container, ToolbarContainer } from "./styles";
import { Board } from "@/components";
import { Toolbar } from "./components";
import { useAppSelector } from "@/redux/hook";

function MainPage() {
  const boards = useAppSelector((state) => state.boardSlice.boards);

  return (
    <Container>
      <BoardContainer>
        {boards.map((board) => (
          <Board key={board.id} />
        ))}
      </BoardContainer>
      <ToolbarContainer>
        <Toolbar />
      </ToolbarContainer>
    </Container>
  );
}

export default MainPage;
