import { useAppSelector } from "@/redux/hook";
import { BoardContainer, Container } from "./styles";
import { BoardComponent } from "./components";
import { Button } from "antd";

function PreviewPage() {
  const boards = useAppSelector((state) => state.boardSlice.boards);

  return (
    <Container>
      <BoardContainer>
        {boards.map((board) => (
          <BoardComponent key={board.id} board={board} />
        ))}
      </BoardContainer>
      <Button>제출</Button>
    </Container>
  );
}

export default PreviewPage;
