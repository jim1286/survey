import { BoardContainer, Container, Empty, ToolbarContainer } from "./styles";
import { BoardComponent, Toolbar } from "./components";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect, useRef, useState } from "react";
import { setBoardResults, setBoards } from "@/redux/features";
import { IconEye } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dragItem = useRef<string>("");
  const dragOverItem = useRef<string>("");
  const boards = useAppSelector((state) => state.boardSlice.boards);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (boards.length !== 0) {
      setIsLoading(false);
      return;
    }

    fetchLocalStorage();
  }, []);

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

  const fetchLocalStorage = () => {
    const localBoards = localStorage.getItem("boards");
    const localBoardResults = localStorage.getItem("boardResults");

    if (localBoards) {
      dispatch(setBoards(JSON.parse(localBoards)));
    }

    if (localBoardResults) {
      dispatch(setBoardResults(JSON.parse(localBoardResults)));
    }

    setIsLoading(false);
  };

  return (
    !isLoading && (
      <Container>
        <IconEye style={{ cursor: "pointer" }} onClick={handleClickPreview} />
        <BoardContainer>
          {boards.length === 0 && <Empty />}
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
    )
  );
}

export default MainPage;
