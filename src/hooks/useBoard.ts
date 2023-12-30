import { BoardTypeEnum } from "@/enums";
import { Board, BoardOption, BoardResult } from "@/interfaces";
import { nanoid } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

type BoardActionType =
  | "addOption"
  | "deleteOption"
  | "changeOption"
  | "addBoard"
  | "copyBoard"
  | "deleteBoard"
  | "switchNecessary"
  | "switchExplanation"
  | "changeTitle"
  | "changeType"
  | "changeExplanation";

type BoardResultActionType = "changeOption" | "clearOption" | "inputAnswer";

const useBoard = () => {
  const getNewBoards = (
    boardAction: BoardActionType,
    boards: Board[],
    boardId?: string,
    optionId?: string,
    value?: string | boolean | BoardTypeEnum
  ) => {
    const newBoards = cloneDeep(boards);
    const boardIndex = newBoards.findIndex((ele) => ele.id === boardId);

    if (boardId && boardIndex === -1) {
      return;
    }

    switch (boardAction) {
      case "addOption": {
        const newBoardsOptions = newBoards[boardIndex].options as BoardOption[];
        const newOption: BoardOption = {
          id: nanoid(),
          value: `옵션 ${newBoardsOptions.length + 1}`,
        };
        const newOptions = newBoardsOptions.concat(newOption);

        newBoards[boardIndex] = {
          ...newBoards[boardIndex],
          options: newOptions,
        };
        break;
      }
      case "deleteOption": {
        const newBoardsOptions = newBoards[boardIndex].options as BoardOption[];
        const optionIndex = newBoardsOptions.findIndex(
          (ele) => ele.id === optionId
        );

        if (optionIndex === -1) {
          return;
        }

        newBoardsOptions.splice(optionIndex, 1);
        break;
      }
      case "changeOption": {
        const newBoardsOptions = newBoards[boardIndex].options as BoardOption[];
        const optionIndex = newBoardsOptions.findIndex(
          (ele) => ele.id === optionId
        );

        if (optionIndex === -1) {
          return;
        }

        const newOption: BoardOption = {
          ...newBoardsOptions[optionIndex],
          value: (value as string) || `옵션 ${optionIndex + 1}`,
        };

        newBoardsOptions.splice(optionIndex, 1, newOption);
        break;
      }
      case "addBoard": {
        const newBoard: Board = {
          id: nanoid(),
          necessary: false,
          explanation: false,
          options: [
            {
              id: nanoid(),
              value: "옵션 1",
            },
          ],
          type: BoardTypeEnum.MULTIPLE_CHOICE,
        };

        newBoards.push(newBoard);
        break;
      }
      case "copyBoard": {
        const newBoardsOptions = [
          ...(newBoards[boardIndex].options as BoardOption[]),
        ];

        newBoardsOptions.forEach((option, index) => {
          newBoardsOptions[index] = {
            ...option,
            id: nanoid(),
          };
        });

        const newBoard = {
          ...newBoards[boardIndex],
          options: newBoardsOptions,
          id: nanoid(),
        };

        newBoards.splice(boardIndex, 0, newBoard);
        break;
      }
      case "deleteBoard": {
        newBoards.splice(boardIndex, 1);
        break;
      }
      case "switchNecessary": {
        newBoards[boardIndex] = {
          ...newBoards[boardIndex],
          necessary: !value,
        };

        break;
      }
      case "switchExplanation": {
        newBoards[boardIndex] = {
          ...newBoards[boardIndex],
          explanation: !value,
        };

        if (!value === false) {
          newBoards[boardIndex] = {
            ...newBoards[boardIndex],
            explanationValue: undefined,
          };
        }

        break;
      }
      case "changeTitle": {
        newBoards[boardIndex] = {
          ...newBoards[boardIndex],
          title: value as string,
        };

        break;
      }
      case "changeType": {
        const type = value as BoardTypeEnum;
        newBoards[boardIndex] = {
          ...newBoards[boardIndex],
          type,
        };

        if (
          type === BoardTypeEnum.SHORT_ANSWER ||
          type === BoardTypeEnum.LONG_ANSWER
        ) {
          newBoards[boardIndex] = {
            ...newBoards[boardIndex],
            options: [
              {
                id: nanoid(),
                value: "옵션 1",
              },
            ],
          };
        }

        break;
      }
      case "changeExplanation": {
        newBoards[boardIndex] = {
          ...newBoards[boardIndex],
          explanationValue: value as string,
        };

        break;
      }
    }
    return newBoards;
  };

  const getNewBoardsResult = (
    boardResultAction: BoardResultActionType,
    boardResults: BoardResult[],
    boardId?: string,
    optionId?: string,
    value?: string
  ) => {
    const newBoardResults = cloneDeep(boardResults);
    const boardResultIndex = newBoardResults.findIndex(
      (boardResult) => boardResult.boardId === boardId
    );

    switch (boardResultAction) {
      case "changeOption": {
        if (!boardId || !optionId) {
          break;
        }

        const newResult = { id: nanoid(), boardId, optionId };

        if (boardResultIndex === -1) {
          newBoardResults.push(newResult);
          break;
        }

        if (boardResults[boardResultIndex].optionId === optionId) {
          newBoardResults.splice(boardResultIndex, 1);
          break;
        }
        newBoardResults[boardResultIndex] = newResult;
        break;
      }
      case "clearOption": {
        newBoardResults.splice(boardResultIndex, 1);
        break;
      }
      case "inputAnswer": {
        if (!boardId) {
          break;
        }

        const newResult = {
          id: nanoid(),
          boardId,
          answer: value,
        };

        if (boardResultIndex === -1) {
          newBoardResults.push(newResult);
          break;
        }

        if (value === "") {
          newBoardResults.splice(boardResultIndex, 1);
          break;
        }

        newBoardResults[boardResultIndex] = newResult;
        break;
      }
    }

    return newBoardResults;
  };

  return { getNewBoards, getNewBoardsResult };
};

export default useBoard;
