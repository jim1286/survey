import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { BoardContainer, Container } from "./styles";
import { BoardComponent } from "./components";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { setBoardResults, setBoards } from "@/redux/features";
import { LocalService } from "@/service";

function PreviewPage() {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boardSlice.boards);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLocalStorage();
  }, []);

  const fetchLocalStorage = () => {
    const localBoardResults = LocalService.get("boardResults");
    const localBoards = LocalService.get("boards");

    if (!localBoardResults || !localBoards) {
      setIsLoading(false);
      return;
    }

    dispatch(setBoardResults(JSON.parse(localBoardResults)));
    dispatch(setBoards(JSON.parse(localBoards)));
    setIsLoading(false);
  };

  return (
    !isLoading && (
      <Container>
        <BoardContainer>
          {boards.map((board) => (
            <BoardComponent key={board.id} board={board} />
          ))}
        </BoardContainer>
        <Button>제출</Button>
      </Container>
    )
  );
}

export default PreviewPage;
