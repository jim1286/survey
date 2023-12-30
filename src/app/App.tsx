import { Outlet } from "react-router-dom";
import { Container } from "./styles";
import { setBoards, setBoardResults } from "@/redux/features";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boardSlice.boards);
  const boardResults = useAppSelector((state) => state.boardSlice.boardResults);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLocalStorage();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      localStorage.setItem("boards", JSON.stringify(boards));
      localStorage.setItem("boardResults", JSON.stringify(boardResults));
    }, 100);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [boards, boardResults]);

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
        <Outlet />
      </Container>
    )
  );
}

export default App;
