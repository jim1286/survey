import { BoardTypeEnum } from "@/enums";
import { Board, BoardOption } from "@/interfaces";
import { nanoid } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

type ActionType =
  | "necessary"
  | "explanation"
  | "title"
  | "type"
  | "explanationValue"
  | "copy"
  | "delete";

const useBoard = () => {
  const getNewBoards = (
    action: ActionType,
    boards: Board[],
    boardId: string,
    value?: string | boolean | BoardTypeEnum
  ) => {
    const newBoards = cloneDeep(boards);
    const boardIndex = newBoards.findIndex((ele) => ele.id === boardId);

    if (boardIndex === -1) {
      return;
    }

    switch (action) {
      case "necessary": {
        newBoards[boardIndex] = {
          ...newBoards[boardIndex],
          necessary: !value,
        };

        break;
      }
      case "explanation": {
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
      case "title": {
        newBoards[boardIndex] = {
          ...newBoards[boardIndex],
          title: value as string,
        };

        break;
      }
      case "type": {
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
                label: BoardTypeEnum.MULTIPLE_CHOICE,
                value: "옵션 1",
              },
            ],
          };
        }

        break;
      }
      case "copy": {
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
      case "delete": {
        newBoards.splice(boardIndex, 1);
        break;
      }
      case "explanationValue": {
        newBoards[boardIndex] = {
          ...newBoards[boardIndex],
          explanationValue: value as string,
        };

        break;
      }
    }
    return newBoards;
  };

  return { getNewBoards };
};

export default useBoard;
