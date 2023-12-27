import { BoardTypeEnum } from "@/enums";
import {
  ChoiceContainer,
  Container,
  OptionContainer,
  RoundCheckBox,
} from "./styles";
import { BoardOption } from "@/interfaces";
import { Checkbox, Input } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setBoards } from "@/redux/features";
import { nanoid } from "@reduxjs/toolkit";

interface Props {
  isClicked: boolean;
  type: BoardTypeEnum;
  boardId: string;
  options?: BoardOption[];
}

function Body({ isClicked, boardId, type, options }: Props) {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boardSlice.boards);

  const handleAddOption = () => {
    const newBoards = [...boards];
    const boardIndex = newBoards.findIndex((ele) => ele.id === boardId);

    if (boardIndex === -1 || !options) {
      return;
    }

    const newOption: BoardOption = {
      label: type,
      value: `옵션 ${options.length + 1}`,
    };

    if (!newBoards[boardIndex].options) {
      return;
    }

    const newOptions = [
      ...(newBoards[boardIndex].options as BoardOption[]),
    ].concat(newOption);

    newBoards[boardIndex] = { ...newBoards[boardIndex], options: newOptions };
    dispatch(setBoards(newBoards));
  };

  const renderOptions = ((type, options) => {
    switch (type) {
      case BoardTypeEnum.SHORT_ANSWER: {
        return <>1</>;
      }
      case BoardTypeEnum.LONG_ANSWER: {
        return <>2</>;
      }
      case BoardTypeEnum.MULTIPLE_CHOICE: {
        return (
          <ChoiceContainer>
            {options?.map((option) => (
              <OptionContainer key={nanoid()}>
                <RoundCheckBox checked={false} />
                {isClicked ? <Input value={option.value} /> : option.value}
              </OptionContainer>
            ))}
            {isClicked && (
              <OptionContainer>
                <RoundCheckBox checked={false} />
                <Input placeholder="질문 추가" onClick={handleAddOption} />
              </OptionContainer>
            )}
          </ChoiceContainer>
        );
      }
      case BoardTypeEnum.CHECKBOX_CHOICE: {
        return (
          <ChoiceContainer>
            {options?.map((option) => (
              <OptionContainer key={nanoid()}>
                <Checkbox checked={false} />
                {isClicked ? <Input value={option.value} /> : option.value}
              </OptionContainer>
            ))}
            {isClicked && (
              <OptionContainer>
                <Checkbox checked={false} />
                <Input placeholder="질문 추가" onClick={handleAddOption} />
              </OptionContainer>
            )}
          </ChoiceContainer>
        );
      }
      case BoardTypeEnum.DROPDOWN_CHOICE: {
        return (
          <ChoiceContainer>
            {options?.map((option, index) => (
              <OptionContainer key={nanoid()}>
                <div>{index + 1}</div>
                {isClicked ? <Input value={option.value} /> : option.value}
              </OptionContainer>
            ))}
            {isClicked && (
              <OptionContainer>
                <div>{options && options.length + 1}</div>
                <Input placeholder="질문 추가" onClick={handleAddOption} />
              </OptionContainer>
            )}
          </ChoiceContainer>
        );
      }
    }
  })(type, options);

  return <Container isClicked={isClicked}>{renderOptions}</Container>;
}

export default Body;
