import { Container, ExplanationWrap } from "./styles";
import { Board } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setBoards, setClickedBoardId } from "@/redux/features";
import { Body, Footer, Header } from "./components";
import { Input } from "antd";
import { ChangeEvent } from "react";
import { useBoard } from "@/hooks";

interface Props {
  board: Board;
}

function BoardComponent({ board }: Props) {
  const dispatch = useAppDispatch();
  const { getNewBoards } = useBoard();
  const boards = useAppSelector((state) => state.boardSlice.boards);
  const clickedBoardId = useAppSelector(
    (state) => state.boardSlice.clickedBoardId
  );
  const isClicked = clickedBoardId === board.id;

  const handleClickBoard = () => {
    dispatch(setClickedBoardId(board.id));
  };

  const handleChangeExplanation = (e: ChangeEvent<HTMLInputElement>) => {
    const newBoards = getNewBoards(
      "explanationValue",
      boards,
      board.id,
      e.target.value
    );

    if (!newBoards) {
      return;
    }

    dispatch(setBoards(newBoards));
  };

  return (
    <Container onClick={handleClickBoard} isClicked={isClicked}>
      <Header
        isClicked={isClicked}
        boardId={board.id}
        title={board.title}
        type={board.type}
      />
      {board.explanation ? (
        isClicked ? (
          <Input
            value={board.explanationValue}
            placeholder="설명"
            onChange={handleChangeExplanation}
          />
        ) : board.explanationValue ? (
          <ExplanationWrap>{board.explanationValue}</ExplanationWrap>
        ) : (
          <ExplanationWrap>설명</ExplanationWrap>
        )
      ) : null}
      <Body
        isClicked={isClicked}
        boardId={board.id}
        type={board.type}
        options={board.options}
      />
      {isClicked && (
        <Footer
          necessary={board.necessary}
          explanation={board.explanation}
          boardId={board.id}
        />
      )}
    </Container>
  );
}

export default BoardComponent;
