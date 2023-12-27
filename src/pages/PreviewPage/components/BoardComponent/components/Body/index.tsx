import { BoardTypeEnum } from "@/enums";
import { ChoiceContainer, Container } from "./styles";
import { BoardOption } from "@/interfaces";
import { Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setBoardResults } from "@/redux/features";
import { nanoid } from "@reduxjs/toolkit";
import { ChangeEvent, useEffect } from "react";
import { ChoiceComponent, ClearButton } from "./components";

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
      localStorage.setItem("boards", JSON.stringify(boards));
      localStorage.setItem("boardResults", JSON.stringify(boardResults));
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
    const newBoardResults = [...boardResults];
    const boardResultIndex = boardResults.findIndex(
      (boardResult) => boardResult.boardId === boardId
    );
    const newResult = {
      id: nanoid(),
      boardId,
      answer: e.target.value,
    };

    if (boardResultIndex === -1) {
      dispatch(setBoardResults(newBoardResults.concat(newResult)));
      return;
    }

    if (e.target.value === "") {
      newBoardResults.splice(boardResultIndex, 1);
      dispatch(setBoardResults(newBoardResults));
      return;
    }

    newBoardResults[boardResultIndex] = newResult;
    dispatch(setBoardResults(newBoardResults));
  };

  const renderOptions = ((type, options, boardResults) => {
    const findBoardResult = boardResults.find(
      (boardResult) => boardResult.boardId === boardId
    );
    const showClear = !!findBoardResult && !necessary;

    switch (type) {
      case BoardTypeEnum.SHORT_ANSWER: {
        return (
          <Input
            value={findBoardResult?.answer}
            placeholder="내 답변"
            style={{ width: "300px" }}
            onChange={handleInputChange}
          />
        );
      }
      case BoardTypeEnum.LONG_ANSWER: {
        return (
          <Input
            value={findBoardResult?.answer}
            placeholder="내 답변"
            onChange={handleInputChange}
          />
        );
      }
      case BoardTypeEnum.MULTIPLE_CHOICE: {
        return (
          <ChoiceComponent
            type={BoardTypeEnum.MULTIPLE_CHOICE}
            showClear={showClear}
            options={options}
            findBoardResult={findBoardResult}
            onOption={handleOption}
            onClearOption={handleClearOption}
          />
        );
      }
      case BoardTypeEnum.CHECKBOX_CHOICE: {
        return (
          <ChoiceComponent
            type={BoardTypeEnum.CHECKBOX_CHOICE}
            showClear={showClear}
            options={options}
            findBoardResult={findBoardResult}
            onOption={handleOption}
            onClearOption={handleClearOption}
          />
        );
      }
      case BoardTypeEnum.DROPDOWN_CHOICE: {
        const selectOptions = options?.map((option) => {
          return { label: option.value, value: option.id };
        });

        return (
          <ChoiceContainer>
            <Select
              value={findBoardResult?.optionId}
              style={{ width: "150px" }}
              size="large"
              onChange={handleOption}
              options={selectOptions}
            />
            {showClear && <ClearButton onClearOption={handleClearOption} />}
          </ChoiceContainer>
        );
      }
    }
  })(type, options, boardResults);

  return <Container>{renderOptions}</Container>;
}

export default Body;
