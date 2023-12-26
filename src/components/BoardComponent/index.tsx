import { Body, Container, Divider, Footer, Header, Necessary } from "./styles";
import { Board } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setBoards, setClickedBoardId } from "@/redux/features";
import { Checkbox, Input, Select, Switch } from "antd";
import { BoardTypeEnum } from "@/enums";
import { IconCopy, IconTrash } from "@tabler/icons-react";
import { ChangeEvent } from "react";

interface Props {
  board: Board;
}

function BoardComponent({ board }: Props) {
  const dispatch = useAppDispatch();
  const clickedBoardId = useAppSelector(
    (state) => state.boardSlice.clickedBoardId
  );
  const boards = useAppSelector((state) => state.boardSlice.boards);
  const isClicked = clickedBoardId === board.id;

  const handleClickBoard = () => {
    dispatch(setClickedBoardId(board.id));
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newBoards = [...boards];
    const boardIndex = newBoards.findIndex((ele) => ele.id === board.id);

    if (boardIndex === -1) {
      return;
    }

    newBoards[boardIndex] = { ...newBoards[boardIndex], title: e.target.value };
    dispatch(setBoards(newBoards));
  };

  return (
    <Container onClick={handleClickBoard} isClicked={isClicked}>
      <Header>
        {isClicked ? (
          <>
            <Input
              size="large"
              placeholder="질문"
              value={board.title}
              onChange={handleChangeTitle}
            />
            <Select
              defaultValue={BoardTypeEnum.LONG_ANSWER}
              style={{ width: "150px" }}
              size="large"
              options={[
                {
                  label: "주관식",
                  options: [
                    { label: "단답형", value: BoardTypeEnum.SHORT_ANSWER },
                    { label: "장문형", value: BoardTypeEnum.LONG_ANSWER },
                  ],
                },
                {
                  label: "선택",
                  options: [
                    {
                      label: "객관식 질문",
                      value: BoardTypeEnum.MULTIPLE_CHOICE,
                    },
                    { label: "체크박스", value: BoardTypeEnum.CHECKBOX_CHOICE },
                    { label: "드롭다운", value: BoardTypeEnum.DROPDOWN_CHOICE },
                  ],
                },
              ]}
            />
          </>
        ) : (
          board.title || "질문"
        )}
      </Header>
      <Body isClicked={isClicked}></Body>
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
