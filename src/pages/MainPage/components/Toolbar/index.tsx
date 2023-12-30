import { Container } from "./styles";
import { IconCirclePlus } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setBoards, setClickedBoardId } from "@/redux/features";
import { useBoard } from "@/hooks";

export interface Position {
  top: number | undefined;
  bottom: number | undefined;
}

function Toolbar() {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boardSlice.boards);
  const { getNewBoards } = useBoard();

  const handleAdd = () => {
    const newBoards = getNewBoards("addBoard", boards);

    if (!newBoards) {
      return;
    }

    dispatch(setBoards(newBoards));
    dispatch(setClickedBoardId(newBoards[newBoards.length - 1].id));
  };

  return (
    <Container>
      <IconCirclePlus
        onClick={handleAdd}
        size={30}
        style={{ cursor: "pointer" }}
      />
    </Container>
  );
}

export default Toolbar;
