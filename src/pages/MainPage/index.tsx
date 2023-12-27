import { BoardContainer, Container, ToolbarContainer } from "./styles";
import { BoardComponent, Toolbar } from "./components";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRef } from "react";
import { setBoards } from "@/redux/features";
import { IconEye } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dragItem = useRef<string>("");
  const dragOverItem = useRef<string>("");
  const boards = useAppSelector((state) => state.boardSlice.boards);

  const handleDragStart = (boardId: string) => {
    dragItem.current = boardId;
  };

  const handleDragEnd = () => {
    const newBoards = [...boards];
    const dragItemIndex = boards.findIndex(
      (board) => board.id === dragItem.current
    );
    const dragOverItemIndex = boards.findIndex(
      (board) => board.id === dragOverItem.current
    );

    dragItem.current = "";
    dragOverItem.current = "";

    if (dragItemIndex === -1 || dragOverItemIndex === -1) {
      return;
    }

    const temp = newBoards[dragItemIndex];
    newBoards[dragItemIndex] = newBoards[dragOverItemIndex];
    newBoards[dragOverItemIndex] = temp;
    dispatch(setBoards(newBoards));
  };

  const handleDragEnter = (boardId: string) => {
    dragOverItem.current = boardId;
  };

  const handleClickPreview = () => {
    navigate("/preview");
  };

  return (
    <Container>
      <IconEye style={{ cursor: "pointer" }} onClick={handleClickPreview} />
      <BoardContainer>
        {boards.map((board) => (
          <BoardComponent
            key={board.id}
            board={board}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragEnter={handleDragEnter}
          />
        ))}
      </BoardContainer>
      <ToolbarContainer>
        <Toolbar />
      </ToolbarContainer>
    </Container>
  );
}

export default MainPage;
