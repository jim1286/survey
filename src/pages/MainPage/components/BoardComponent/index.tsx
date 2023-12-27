import { Container, Divider, Footer, Necessary } from "./styles";
import { Board } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setClickedBoardId } from "@/redux/features";
import { Checkbox, Switch } from "antd";
import { IconCopy, IconTrash } from "@tabler/icons-react";
import { Body, Header } from "./components";

interface Props {
  board: Board;
}

function BoardComponent({ board }: Props) {
  const dispatch = useAppDispatch();
  const clickedBoardId = useAppSelector(
    (state) => state.boardSlice.clickedBoardId
  );
  const isClicked = clickedBoardId === board.id;

  const handleClickBoard = () => {
    dispatch(setClickedBoardId(board.id));
  };

  return (
    <Container onClick={handleClickBoard} isClicked={isClicked}>
      <Header
        isClicked={isClicked}
        boardId={board.id}
        title={board.title}
        type={board.type}
      />
      <Body
        isClicked={isClicked}
        boardId={board.id}
        type={board.type}
        options={board.options}
      />
      {isClicked && (
        <Footer>
          <IconCopy />
          <IconTrash />
          <Divider />
          <Necessary>
            필수
            <Switch />
          </Necessary>
          <Checkbox>설명</Checkbox>
        </Footer>
      )}
    </Container>
  );
}

export default BoardComponent;
