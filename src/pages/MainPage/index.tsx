import { BoardContainer, Container, ToolbarContainer } from "./styles";
import { BoardComponent, Toolbar } from "./components";
import { useAppSelector } from "@/redux/hook";

function MainPage() {
  const boards = useAppSelector((state) => state.boardSlice.boards);

  return (
    <Container>
      <BoardContainer>
        {boards.map((board) => (
          <BoardComponent key={board.id} board={board} />
        ))}
      </BoardContainer>
      <ToolbarContainer>
        <Toolbar />
      </ToolbarContainer>
    </Container>
  );
}

export default MainPage;
