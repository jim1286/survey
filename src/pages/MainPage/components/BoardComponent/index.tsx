import { Container, ExplanationWrap, MoveContainer, Spacer } from "./styles";
import { Board, BoardOption } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setBoards, setClickedBoardId } from "@/redux/features";
import { Body, Footer, Header } from "./components";
import { Input } from "antd";
import { ChangeEvent, useRef, useState } from "react";
import { useBoard } from "@/hooks";
import { IconSelector } from "@tabler/icons-react";
import { cloneDeep } from "lodash";

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
  const [enteredOptionId, setEnteredOptionId] = useState("");
  const clickedBoardId = useAppSelector(
    (state) => state.boardSlice.clickedBoardId
  );
  const isClicked = clickedBoardId === board.id;

  const handleClickBoard = () => {
    dispatch(setClickedBoardId(board.id));
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
    const newBoards = cloneDeep(boards);
    const boardIndex = boards.findIndex((ele) => ele.id === board.id);

    if (boardIndex === -1) {
      return;
    }

    const newBoardsOptions = newBoards[boardIndex].options as BoardOption[];
    const dragItemIndex = newBoardsOptions.findIndex(
      (option) => option.id === dragItem.current
    );
    const dragOverItemIndex = newBoardsOptions.findIndex(
      (option) => option.id === dragOverItem.current
    );

    dragItem.current = "";
    dragOverItem.current = "";

    if (dragItemIndex === -1 || dragOverItemIndex === -1) {
      return;
    }

    const temp = newBoardsOptions[dragItemIndex];
    newBoardsOptions[dragItemIndex] = newBoardsOptions[dragOverItemIndex];
    newBoardsOptions[dragOverItemIndex] = temp;
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
