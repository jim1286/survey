import { BoardTypeEnum } from "@/enums";
import { ChoiceContainer, Container } from "./styles";
import { BoardOption } from "@/interfaces";
import { Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setBoardResults } from "@/redux/features";
import { ChangeEvent, useEffect } from "react";
import { ChoiceComponent, ClearButton } from "./components";
import { useBoard } from "@/hooks";

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
  const { getNewBoardsResult } = useBoard();

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
    const newBoardResults = getNewBoardsResult(
      "changeOption",
      boardResults,
      boardId,
      optionId
    );

    if (!newBoardResults) {
      return;
    }

    dispatch(setBoardResults(newBoardResults));
  };

  const handleClearOption = () => {
    const newBoardResults = getNewBoardsResult(
      "clearOption",
      boardResults,
      boardId
    );

    if (!newBoardResults) {
      return;
    }

    dispatch(setBoardResults(newBoardResults));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newBoardResults = getNewBoardsResult(
      "inputChange",
      boardResults,
      boardId,
      undefined,
      e.target.value
    );

    if (!newBoardResults) {
      return;
    }

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
