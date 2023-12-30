import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { BoardContainer, ButtonWrap, Container } from "./styles";
import { BoardComponent } from "./components";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { clearBoardResult } from "@/redux/features";
import { IconArrowBack } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function PreviewPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const boards = useAppSelector((state) => state.boardSlice.boards);
  const boardResults = useAppSelector((state) => state.boardSlice.boardResults);
  const necessaries = boards.filter((board) => board.necessary);
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    let disableSubmit = false;

    necessaries.forEach((necessary) => {
      if (disableSubmit) {
        return;
      }

      const findResult = boardResults.find(
        (boardResult) => boardResult.boardId === necessary.id
      );

      if (!findResult) {
        disableSubmit = true;
      }
    });

    setDisableSubmit(disableSubmit);
  }, [boardResults, necessaries]);

  const handleClearResult = () => {
    dispatch(clearBoardResult());
    localStorage.removeItem("boardResults");
  };

  const handleClickSurvey = () => {
    navigate("/");
  };

  return (
    <Container>
      <IconArrowBack
        style={{ cursor: "pointer" }}
        onClick={handleClickSurvey}
      />
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
  );
}

export default PreviewPage;
