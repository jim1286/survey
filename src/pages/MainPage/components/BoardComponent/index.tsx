import { Container, ExplanationWrap, MoveContainer, Spacer } from "./styles";
import { Board } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setBoards, setClickedBoardId } from "@/redux/features";
import { Body, Footer, Header } from "./components";
import { Input } from "antd";
import { ChangeEvent, useRef, useState } from "react";
import { useBoard } from "@/hooks";
import { IconSelector } from "@tabler/icons-react";

interface Props {
  board: Board;
  onDragStart: (boardId: string) => void;
  onDragEnd: () => void;
  onDragEnter: (boardId: string) => void;
}

function BoardComponent({ board, onDragStart, onDragEnd, onDragEnter }: Props) {
  const dispatch = useAppDispatch();
  const { getNewBoards } = useBoard();
  const dragItem = useRef<string>("");
  const dragOverItem = useRef<string>("");
  const boards = useAppSelector((state) => state.boardSlice.boards);
  const clickedBoardId = useAppSelector(
    (state) => state.boardSlice.clickedBoardId
  );
  const [enteredOptionId, setEnteredOptionId] = useState("");
  const isClicked = clickedBoardId === board.id;

  const handleClickBoard = () => {
    if (board.id !== clickedBoardId) {
      dispatch(setClickedBoardId(board.id));
    }
  };

  const handleChangeExplanation = (e: ChangeEvent<HTMLInputElement>) => {
    const newBoards = getNewBoards(
      "changeExplanation",
      boards,
      board.id,
      undefined,
      e.target.value
    );

    if (!newBoards) {
      return;
    }

    dispatch(setBoards(newBoards));
  };

  const handleDragStart = (optionId: string) => {
    dragItem.current = optionId;
  };

  const handleDragEnd = () => {
    const newBoards = getNewBoards(
      "changeBoard",
      boards,
      board.id,
      dragItem.current,
      dragOverItem.current
    );
    dragItem.current = "";
    dragOverItem.current = "";

    if (!newBoards) {
      return;
    }

    dispatch(setBoards(newBoards));
  };

  const handleDragEnter = (optionId: string) => {
    dragOverItem.current = optionId;
  };

  const handleMouseEnter = (boardId: string) => {
    setEnteredOptionId(boardId);
  };

  const handleMouseLeave = () => {
    setEnteredOptionId("");
  };

  return (
    <Container
      onClick={handleClickBoard}
      isClicked={isClicked}
      onMouseEnter={() => handleMouseEnter(board.id)}
      onMouseLeave={handleMouseLeave}
      onDragEnter={() => onDragEnter(board.id)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
    >
      {enteredOptionId === board.id && isClicked ? (
        <MoveContainer draggable onDragStart={() => onDragStart(board.id)}>
          <IconSelector />
        </MoveContainer>
      ) : (
        <Spacer />
      )}
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
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragEnter={handleDragEnter}
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
