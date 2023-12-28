import { BoardTypeEnum } from "@/enums";
import { ChangeEvent } from "react";
import { Container, TitleWrap } from "./styles";
import { Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setBoards } from "@/redux/features";
import { useBoard } from "@/hooks";

interface Props {
  isClicked: boolean;
  boardId: string;
  type: BoardTypeEnum;
  title?: string;
}

function Header({ isClicked, boardId, type, title }: Props) {
  const dispatch = useAppDispatch();
  const { getNewBoards } = useBoard();
  const boards = useAppSelector((state) => state.boardSlice.boards);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newBoards = getNewBoards(
      "changeTitle",
      boards,
      boardId,
      undefined,
      e.target.value
    );

    if (!newBoards) {
      return;
    }

    dispatch(setBoards(newBoards));
  };

  const handleChangeType = (value: BoardTypeEnum) => {
    const newBoards = getNewBoards(
      "changeType",
      boards,
      boardId,
      undefined,
      value
    );

    if (!newBoards) {
      return;
    }

    dispatch(setBoards(newBoards));
  };

  return isClicked ? (
    <Container>
      <Input
        size="large"
        placeholder="질문"
        value={title}
        onChange={handleChangeTitle}
      />
      <Select
        defaultValue={type}
        style={{ width: "180px" }}
        size="large"
        onChange={handleChangeType}
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
    </Container>
  ) : title ? (
    <TitleWrap>{title}</TitleWrap>
  ) : (
    <TitleWrap>질문</TitleWrap>
  );
}

export default Header;
