import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { BoardContainer, ButtonWrap, Container } from "./styles";
import { BoardComponent } from "./components";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { clearBoardResult, setBoardResults, setBoards } from "@/redux/features";

function PreviewPage() {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boardSlice.boards);
  const boardResults = useAppSelector((state) => state.boardSlice.boardResults);
  const necessaries = boards.filter((board) => board.necessary);
  const [isLoading, setIsLoading] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    if (boards.length !== 0) {
      setIsLoading(false);
      return;
    }

    fetchLocalStorage();
  }, []);

  useEffect(() => {
    let disableSubmit = false;

    necessaries.forEach((necessary) => {
      const findResult = boardResults.find(
        (boardResult) => boardResult.boardId === necessary.id
      );
      if (!findResult) {
        disableSubmit = true;
      }
    });

    setDisableSubmit(disableSubmit);
  }, [boardResults, necessaries]);

  const fetchLocalStorage = () => {
    const localBoardResults = localStorage.getItem("boardResults");
    const localBoards = localStorage.getItem("boards");

    if (localBoards) {
      dispatch(setBoards(JSON.parse(localBoards)));
    }

    if (localBoardResults) {
      dispatch(setBoardResults(JSON.parse(localBoardResults)));
    }

    setIsLoading(false);
  };

  const handleClearResult = () => {
    dispatch(clearBoardResult());
    localStorage.removeItem("boardResults");
  };

  return (
    !isLoading && (
      <Container>
        <BoardContainer>
          {boards.map((board) => (
            <BoardComponent key={board.id} board={board} />
          ))}
        </BoardContainer>
        <ButtonWrap>
          <Button disabled={disableSubmit}>제출</Button>
          <Button type="text" onClick={handleClearResult}>
            양식 지우기
          </Button>
        </ButtonWrap>
      </Container>
    )
  );
}

export default PreviewPage;
