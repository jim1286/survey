import { IconCopy, IconTrash } from "@tabler/icons-react";
import { Switch } from "antd";
import { Container, Divider, SwitchContainer } from "./styles";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  setBoardResults,
  setBoards,
  setClickedBoardId,
} from "@/redux/features";
import { useBoard } from "@/hooks";

interface Props {
  necessary: boolean;
  explanation: boolean;
  boardId: string;
}

function Footer({ necessary, explanation, boardId }: Props) {
  const dispatch = useAppDispatch();
  const { getNewBoards, getNewBoardsResult } = useBoard();
  const boards = useAppSelector((state) => state.boardSlice.boards);
  const boardResults = useAppSelector((state) => state.boardSlice.boardResults);
  const clickedBoardId = useAppSelector(
    (state) => state.boardSlice.clickedBoardId
  );

  const handleSwitchNecessary = () => {
    const newBoards = getNewBoards(
      "switchNecessary",
      boards,
      boardId,
      undefined,
      necessary
    );

    if (!newBoards) {
      return;
    }

    dispatch(setBoards(newBoards));
  };

  const handleSwitchExplanation = () => {
    const newBoards = getNewBoards(
      "switchExplanation",
      boards,
      boardId,
      undefined,
      explanation
    );

    if (!newBoards) {
      return;
    }

    dispatch(setBoards(newBoards));
  };

  const handleCopy = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    const newBoards = getNewBoards("copyBoard", boards, boardId);

    if (!newBoards) {
      return;
    }

    const boardIndex = newBoards.findIndex(
      (newBoard) => newBoard.id === clickedBoardId
    );

    if (boardIndex === -1) {
      return;
    }

    dispatch(setBoards(newBoards));
    dispatch(setClickedBoardId(newBoards[boardIndex + 1].id));
  };

  const handleDelete = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    const newBoards = getNewBoards("deleteBoard", boards, boardId);

    if (!newBoards) {
      return;
    }

    dispatch(setBoards(newBoards));

    const newBoardResults = getNewBoardsResult(
      "deleteOption",
      boardResults,
      boardId
    );

    if (!newBoardResults) {
      return;
    }

    dispatch(setBoardResults(newBoardResults));
  };

  return (
    <Container>
      <IconCopy style={{ cursor: "pointer" }} onClick={(e) => handleCopy(e)} />
      <IconTrash
        style={{ cursor: "pointer" }}
        onClick={(e) => handleDelete(e)}
      />
      <Divider />
      <SwitchContainer>
        필수
        <Switch checked={necessary} onChange={handleSwitchNecessary} />
      </SwitchContainer>
      <SwitchContainer>
        설명
        <Switch checked={explanation} onChange={handleSwitchExplanation} />
      </SwitchContainer>
    </Container>
  );
}

export default Footer;
