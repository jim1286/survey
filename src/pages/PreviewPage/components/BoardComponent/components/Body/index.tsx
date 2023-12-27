import { BoardTypeEnum } from "@/enums";
import {
  ButtonContainer,
  ChoiceContainer,
  Container,
  OptionContainer,
  RoundCheckBox,
} from "./styles";
import { BoardOption } from "@/interfaces";
import { Button, Checkbox, Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setBoardResults } from "@/redux/features";
import { nanoid } from "@reduxjs/toolkit";
import { ChangeEvent, useEffect } from "react";
import { LocalService } from "@/service";

interface Props {
  type: BoardTypeEnum;
  boardId: string;
  necessary: boolean;
  options?: BoardOption[];
}

function Body({ type, boardId, necessary, options }: Props) {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boardSlice.boards);
  const boardResults = useAppSelector((state) => state.boardSlice.boardResults);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      LocalService.set("boards", JSON.stringify(boards));
      LocalService.set("boardResults", JSON.stringify(boardResults));
    }, 1000);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [boardResults]);

  const handleOption = (optionId: string) => {
    const newBoardResults = [...boardResults];
    const boardResultIndex = boardResults.findIndex(
      (boardResult) => boardResult.boardId === boardId
    );

    if (boardResultIndex === -1) {
      const newResult = { id: nanoid(), boardId, optionId };
      dispatch(setBoardResults(newBoardResults.concat(newResult)));
      return;
    }

    if (boardResults[boardResultIndex].optionId === optionId) {
      newBoardResults.splice(boardResultIndex, 1);
      dispatch(setBoardResults(newBoardResults));
      return;
    }

    const newResult = { id: nanoid(), boardId, optionId };
    newBoardResults[boardResultIndex] = newResult;
    dispatch(setBoardResults(newBoardResults));
    return;
  };

  const handleClearOption = () => {
    const newBoardResults = [...boardResults];
    const boardResultIndex = boardResults.findIndex(
      (boardResult) => boardResult.boardId === boardId
    );
    newBoardResults.splice(boardResultIndex, 1);
    dispatch(setBoardResults(newBoardResults));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const renderOptions = ((type, options, boardResults) => {
    switch (type) {
      case BoardTypeEnum.SHORT_ANSWER: {
        return (
          <Input
            placeholder="내 답변"
            style={{ width: "300px" }}
            onChange={handleInputChange}
          />
        );
      }
      case BoardTypeEnum.LONG_ANSWER: {
        return <Input placeholder="내 답변" onChange={handleInputChange} />;
      }
      case BoardTypeEnum.MULTIPLE_CHOICE: {
        const find = boardResults.find(
          (boardResult) => boardResult.boardId === boardId
        );
        const showClear = find && !necessary;

        return (
          <ChoiceContainer>
            {options?.map((option) => {
              let checked = false;
              if (find && find.optionId === option.id) {
                checked = true;
              }

              return (
                <OptionContainer key={option.id}>
                  <RoundCheckBox
                    checked={checked}
                    onClick={() => handleOption(option.id)}
                  />
                  {option.value}
                </OptionContainer>
              );
            })}
            {showClear && (
              <ButtonContainer>
                <Button
                  type="text"
                  onClick={handleClearOption}
                  style={{ width: "100px" }}
                >
                  선택해제
                </Button>
              </ButtonContainer>
            )}
          </ChoiceContainer>
        );
      }
      case BoardTypeEnum.CHECKBOX_CHOICE: {
        const find = boardResults.find(
          (boardResult) => boardResult.boardId === boardId
        );
        const showClear = find && !necessary;

        return (
          <ChoiceContainer>
            {options?.map((option) => {
              let checked = false;
              if (find && find.optionId === option.id) {
                checked = true;
              }

              return (
                <OptionContainer key={option.id}>
                  <Checkbox
                    checked={checked}
                    onClick={() => handleOption(option.id)}
                  />
                  {option.value}
                </OptionContainer>
              );
            })}
            {showClear && (
              <ButtonContainer>
                <Button
                  type="text"
                  onClick={handleClearOption}
                  style={{ width: "100px" }}
                >
                  선택해제
                </Button>
              </ButtonContainer>
            )}
          </ChoiceContainer>
        );
      }
      case BoardTypeEnum.DROPDOWN_CHOICE: {
        const find = boardResults.find(
          (boardResult) => boardResult.boardId === boardId
        );
        const selectOptions = options?.map((option) => {
          return { label: option.value, value: option.id };
        });
        const showClear = find && !necessary;

        return (
          <ChoiceContainer>
            <Select
              value={find?.optionId}
              style={{ width: "150px" }}
              size="large"
              onChange={handleOption}
              options={selectOptions}
            />
            {showClear && (
              <ButtonContainer>
                <Button
                  type="text"
                  onClick={handleClearOption}
                  style={{ width: "100px" }}
                >
                  선택해제
                </Button>
              </ButtonContainer>
            )}
          </ChoiceContainer>
        );
      }
    }
  })(type, options, boardResults);

  return <Container>{renderOptions}</Container>;
}

export default Body;
