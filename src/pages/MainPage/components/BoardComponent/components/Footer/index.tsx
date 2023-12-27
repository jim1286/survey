import { IconCopy, IconTrash } from "@tabler/icons-react";
import { Switch } from "antd";
import { Container, Divider, SwitchContainer } from "./styles";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setBoards } from "@/redux/features";
import { useBoard } from "@/hooks";

interface Props {
  necessary: boolean;
  explanation: boolean;
  boardId: string;
}

function Footer({ necessary, explanation, boardId }: Props) {
  const dispatch = useAppDispatch();
  const { getNewBoards } = useBoard();
  const boards = useAppSelector((state) => state.boardSlice.boards);

  const handleSwitchNecessary = () => {
    const newBoards = getNewBoards("necessary", boards, boardId, necessary);

    if (!newBoards) {
      return;
    }

    dispatch(setBoards(newBoards));
  };

  const handleSwitchExplanation = () => {
    const newBoards = getNewBoards("explanation", boards, boardId, explanation);

    if (!newBoards) {
      return;
    }

    dispatch(setBoards(newBoards));
  };

  const handleCopy = () => {
    const newBoards = getNewBoards("copy", boards, boardId);

    if (!newBoards) {
      return;
    }

    dispatch(setBoards(newBoards));
  };

  const handleDelete = () => {
    const newBoards = getNewBoards("delete", boards, boardId);

    if (!newBoards) {
      return;
    }

    dispatch(setBoards(newBoards));
  };

  return (
    <Container>
      <IconCopy style={{ cursor: "pointer" }} onClick={handleCopy} />
      <IconTrash style={{ cursor: "pointer" }} onClick={handleDelete} />
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
