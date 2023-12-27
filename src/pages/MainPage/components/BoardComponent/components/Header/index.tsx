import { BoardTypeEnum } from "@/enums";
import { ChangeEvent } from "react";
import { Container } from "./styles";
import { Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setBoards } from "@/redux/features";

interface Props {
  isClicked: boolean;
  boardId: string;
  type: BoardTypeEnum;
  title?: string;
}

function Header({ isClicked, boardId, type, title }: Props) {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boardSlice.boards);

  const getNewBoards = (
    changType: "title" | "type",
    value: string | BoardTypeEnum
  ) => {
    const newBoards = [...boards];
    const boardIndex = newBoards.findIndex((ele) => ele.id === boardId);

    if (boardIndex === -1) {
      return;
    }

    switch (changType) {
      case "title": {
        newBoards[boardIndex] = {
          ...newBoards[boardIndex],
          title: value as string,
        };

        break;
      }
      case "type": {
        newBoards[boardIndex] = {
          ...newBoards[boardIndex],
          type: value as BoardTypeEnum,
        };

        break;
      }
    }
    return newBoards;
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newBoards = getNewBoards("title", e.target.value);

    if (!newBoards) {
      return;
    }

    dispatch(setBoards(newBoards));
  };

  const handleChangeType = (value: BoardTypeEnum) => {
    const newBoards = getNewBoards("type", value);

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
        style={{ width: "150px" }}
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
  ) : (
    title || "질문"
  );
}

export default Header;
