import { BoardTypeEnum } from "@/enums";
import {
  ChoiceContainer,
  Container,
  InputContainer,
  MoveContainer,
  NumberWrap,
  OptionContainer,
  RoundCheckBox,
} from "./styles";
import { BoardOption } from "@/interfaces";
import { Checkbox, Input } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setBoards } from "@/redux/features";
import { nanoid } from "@reduxjs/toolkit";
import { ChangeEvent, useState } from "react";
import { cloneDeep } from "lodash";
import { IconSelector, IconX } from "@tabler/icons-react";

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
  const boards = useAppSelector((state) => state.boardSlice.boards);
  const [enteredOptionId, setEnteredOptionId] = useState("");

  const handleChangeOption = (
    e: ChangeEvent<HTMLInputElement>,
    optionId: string
  ) => {
    const newBoards = cloneDeep(boards);
    const boardIndex = newBoards.findIndex((ele) => ele.id === boardId);

    if (boardIndex === -1) {
      return;
    }

    const newBoardsOptions = newBoards[boardIndex].options as BoardOption[];
    const optionIndex = newBoardsOptions.findIndex(
      (ele) => ele.id === optionId
    );

    if (optionIndex === -1) {
      return;
    }

    const newOption: BoardOption = {
      ...newBoardsOptions[optionIndex],
      value: e.target.value || `옵션 ${optionIndex + 1}`,
    };

    newBoardsOptions.splice(optionIndex, 1, newOption);
    dispatch(setBoards(newBoards));
  };

  const handelDeleteOption = (optionId: string) => {
    const newBoards = cloneDeep(boards);
    const boardIndex = newBoards.findIndex((ele) => ele.id === boardId);

    if (boardIndex === -1) {
      return;
    }

    const newBoardsOptions = newBoards[boardIndex].options as BoardOption[];
    const optionIndex = newBoardsOptions.findIndex(
      (ele) => ele.id === optionId
    );

    if (optionIndex === -1) {
      return;
    }

    newBoardsOptions.splice(optionIndex, 1);
    dispatch(setBoards(newBoards));
  };

  const handleAddOption = () => {
    const newBoards = cloneDeep(boards);
    const boardIndex = newBoards.findIndex((ele) => ele.id === boardId);

    if (boardIndex === -1 || !options) {
      return;
    }

    const newBoardsOptions = newBoards[boardIndex].options as BoardOption[];
    const newOption: BoardOption = {
      id: nanoid(),
      label: type,
      value: `옵션 ${options.length + 1}`,
    };
    const newOptions = newBoardsOptions.concat(newOption);

    newBoards[boardIndex] = { ...newBoards[boardIndex], options: newOptions };
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
          <ChoiceContainer>
            {options?.map((option) => (
              <OptionContainer
                key={option.id}
                onMouseEnter={() => handleMouseEnter(option.id)}
                onMouseLeave={handleMouseLeave}
                onDragEnd={onDragEnd}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => onDragEnter(option.id)}
              >
                {enteredOptionId === option.id && (
                  <MoveContainer
                    draggable
                    onDragStart={() => onDragStart(option.id)}
                  >
                    <IconSelector />
                  </MoveContainer>
                )}
                <RoundCheckBox checked={false} />
                {isClicked ? (
                  <InputContainer>
                    <Input
                      value={option.value}
                      onChange={(e) => handleChangeOption(e, option.id)}
                    />
                    {options.length !== 1 && (
                      <IconX
                        style={{ cursor: "pointer" }}
                        onClick={() => handelDeleteOption(option.id)}
                      />
                    )}
                  </InputContainer>
                ) : (
                  option.value
                )}
              </OptionContainer>
            ))}
            {isClicked && (
              <OptionContainer>
                <RoundCheckBox checked={false} />
                <Input
                  placeholder="질문 추가"
                  onClick={handleAddOption}
                  value={""}
                />
              </OptionContainer>
            )}
          </ChoiceContainer>
        );
      }
      case BoardTypeEnum.CHECKBOX_CHOICE: {
        return (
          <ChoiceContainer>
            {options?.map((option) => (
              <OptionContainer
                key={option.id}
                onMouseEnter={() => handleMouseEnter(option.id)}
                onDragEnd={onDragEnd}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => onDragEnter(option.id)}
              >
                {enteredOptionId === option.id && (
                  <MoveContainer
                    draggable
                    onDragStart={() => onDragStart(option.id)}
                  >
                    <IconSelector />
                  </MoveContainer>
                )}
                <Checkbox checked={false} />
                {isClicked ? (
                  <InputContainer>
                    <Input
                      value={option.value}
                      onChange={(e) => handleChangeOption(e, option.id)}
                    />
                    {options.length !== 1 && (
                      <IconX
                        style={{ cursor: "pointer" }}
                        onClick={() => handelDeleteOption(option.id)}
                      />
                    )}
                  </InputContainer>
                ) : (
                  option.value
                )}
              </OptionContainer>
            ))}
            {isClicked && (
              <OptionContainer>
                <Checkbox checked={false} />
                <Input
                  placeholder="질문 추가"
                  onClick={handleAddOption}
                  value={""}
                />
              </OptionContainer>
            )}
          </ChoiceContainer>
        );
      }
      case BoardTypeEnum.DROPDOWN_CHOICE: {
        return (
          <ChoiceContainer>
            {options?.map((option, index) => (
              <OptionContainer
                key={option.id}
                onMouseEnter={() => handleMouseEnter(option.id)}
                onDragEnd={onDragEnd}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => onDragEnter(option.id)}
              >
                {enteredOptionId === option.id && (
                  <MoveContainer
                    draggable
                    onDragStart={() => onDragStart(option.id)}
                  >
                    <IconSelector />
                  </MoveContainer>
                )}
                <NumberWrap>{index + 1}</NumberWrap>
                {isClicked ? (
                  <InputContainer>
                    <Input
                      value={option.value}
                      onChange={(e) => handleChangeOption(e, option.id)}
                    />
                    {options.length !== 1 && (
                      <IconX
                        style={{ cursor: "pointer" }}
                        onClick={() => handelDeleteOption(option.id)}
                      />
                    )}
                  </InputContainer>
                ) : (
                  option.value
                )}
              </OptionContainer>
            ))}
            {isClicked && (
              <OptionContainer>
                <NumberWrap>{options && options.length + 1}</NumberWrap>
                <Input
                  placeholder="질문 추가"
                  onClick={handleAddOption}
                  value={""}
                />
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
