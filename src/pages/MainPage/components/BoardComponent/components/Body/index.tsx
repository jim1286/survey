import { BoardTypeEnum } from "@/enums";
import { Container } from "./styles";
import { BoardOption } from "@/interfaces";
import { Input } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setBoards } from "@/redux/features";
import { ChangeEvent, useState } from "react";
import { ChoiceComponent } from "./components";
import { useBoard } from "@/hooks";

interface Props {
  isClicked: boolean;
  type: BoardTypeEnum;
  boardId: string;
  options?: BoardOption[];
  onDragStart: (optionId: string) => void;
  onDragEnd: () => void;
  onDragEnter: (optionId: string) => void;
}

function Body({
  isClicked,
  boardId,
  type,
  options,
  onDragStart,
  onDragEnd,
  onDragEnter,
}: Props) {
  const dispatch = useAppDispatch();
  const { getNewBoards } = useBoard();
  const boards = useAppSelector((state) => state.boardSlice.boards);
  const [enteredOptionId, setEnteredOptionId] = useState("");

  const handleChangeOption = (
    e: ChangeEvent<HTMLInputElement>,
    optionId: string
  ) => {
    const newBoards = getNewBoards(
      "changeOption",
      boards,
      boardId,
      optionId,
      e.target.value
    );

    if (!newBoards) {
      return;
    }

    dispatch(setBoards(newBoards));
  };

  const handelDeleteOption = (optionId: string) => {
    const newBoards = getNewBoards("deleteOption", boards, boardId, optionId);

    if (!newBoards) {
      return;
    }

    dispatch(setBoards(newBoards));
  };

  const handleAddOption = () => {
    const newBoards = getNewBoards("addOption", boards, boardId);

    if (!newBoards) {
      return;
    }

    dispatch(setBoards(newBoards));
  };

  const handleMouseEnter = (optionId: string) => {
    setEnteredOptionId(optionId);
  };

  const handleMouseLeave = () => {
    setEnteredOptionId("");
  };

  const renderOptions = ((type, options) => {
    switch (type) {
      case BoardTypeEnum.SHORT_ANSWER: {
        return (
          <Input
            placeholder="단답형 텍스트"
            style={{ width: "200px" }}
            value={""}
          />
        );
      }
      case BoardTypeEnum.LONG_ANSWER: {
        return (
          <Input
            placeholder="장문형 텍스트"
            style={{ width: "400px" }}
            value={""}
          />
        );
      }
      case BoardTypeEnum.MULTIPLE_CHOICE: {
        return (
          <ChoiceComponent
            type={BoardTypeEnum.MULTIPLE_CHOICE}
            enteredOptionId={enteredOptionId}
            options={options}
            isClicked={isClicked}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onDragEnd={onDragEnd}
            onDragEnter={onDragEnter}
            onDragStart={onDragStart}
            onChangeOption={handleChangeOption}
            onDeleteOption={handelDeleteOption}
            onAddOption={handleAddOption}
          />
        );
      }
      case BoardTypeEnum.CHECKBOX_CHOICE: {
        return (
          <ChoiceComponent
            type={BoardTypeEnum.CHECKBOX_CHOICE}
            enteredOptionId={enteredOptionId}
            options={options}
            isClicked={isClicked}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onDragEnd={onDragEnd}
            onDragEnter={onDragEnter}
            onDragStart={onDragStart}
            onChangeOption={handleChangeOption}
            onDeleteOption={handelDeleteOption}
            onAddOption={handleAddOption}
          />
        );
      }
      case BoardTypeEnum.DROPDOWN_CHOICE: {
        return (
          <ChoiceComponent
            type={BoardTypeEnum.DROPDOWN_CHOICE}
            enteredOptionId={enteredOptionId}
            options={options}
            isClicked={isClicked}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onDragEnd={onDragEnd}
            onDragEnter={onDragEnter}
            onDragStart={onDragStart}
            onChangeOption={handleChangeOption}
            onDeleteOption={handelDeleteOption}
            onAddOption={handleAddOption}
          />
        );
      }
    }
  })(type, options);

  return <Container isClicked={isClicked}>{renderOptions}</Container>;
}

export default Body;
