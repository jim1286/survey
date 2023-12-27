import { BoardTypeEnum } from "@/enums";
import { Board } from "@/interfaces";

type KeyType =
  | "necessary"
  | "explanation"
  | "title"
  | "type"
  | "explanationValue";

const useBoard = () => {
  const getNewBoards = (
    key: KeyType,
    boards: Board[],
    boardId: string,
    value: string | boolean | BoardTypeEnum
  ) => {
    const newBoards = [...boards];
    const boardIndex = newBoards.findIndex((ele) => ele.id === boardId);

    if (boardIndex === -1) {
      return;
    }

    switch (key) {
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
        newBoards[boardIndex] = {
          ...newBoards[boardIndex],
          type: value as BoardTypeEnum,
        };

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
