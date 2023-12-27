import { Container } from "./styles";
import { IconCirclePlus } from "@tabler/icons-react";
import { useAppDispatch } from "@/redux/hook";
import { addBoard } from "@/redux/features";
import { BoardTypeEnum } from "@/enums";
import { nanoid } from "@reduxjs/toolkit";
import { Board } from "@/interfaces";

export interface Position {
  top: number | undefined;
  bottom: number | undefined;
}

function Toolbar() {
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    const newBoard: Board = {
      id: nanoid(),
      necessary: false,
      explanation: false,
      options: [
        {
          id: nanoid(),
          label: BoardTypeEnum.MULTIPLE_CHOICE,
          value: "옵션 1",
        },
      ],
      type: BoardTypeEnum.MULTIPLE_CHOICE,
    };

    dispatch(addBoard(newBoard));
  };

  return (
    <Container>
      <IconCirclePlus
        onClick={handleAdd}
        size={30}
        style={{ cursor: "pointer" }}
      />
    </Container>
  );
}

export default Toolbar;
