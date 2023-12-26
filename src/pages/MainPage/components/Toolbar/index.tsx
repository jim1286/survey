import { useEffect, useState, useTransition } from "react";
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
  const defaultPosition = 320 * 2;
  const [isPending, startTransition] = useTransition();
  const [position, setPosition] = useState<Position>({
    top: defaultPosition,
    bottom: undefined,
  });

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const offsetHeight = (e.target as Document).documentElement.offsetHeight;
      const currentHeight =
        (e.target as Document).documentElement.scrollTop + window.innerHeight;
      let newPosition: Position;

      if (offsetHeight - currentHeight > 320 * 8) {
        newPosition = {
          top: undefined,
          bottom: offsetHeight - currentHeight,
        };
      } else {
        newPosition = {
          top:
            window.scrollY > defaultPosition ? window.scrollY : defaultPosition,
          bottom: undefined,
        };
      }

      startTransition(() => setPosition(newPosition));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [position]);

  const handleAdd = () => {
    const newBoard: Board = {
      id: nanoid(),
      necessary: false,
      type: BoardTypeEnum.MULTIPLE_CHOICE,
    };

    dispatch(addBoard(newBoard));
  };

  return (
    !isPending && (
      <Container position={position}>
        <IconCirclePlus
          onClick={handleAdd}
          size={30}
          style={{ cursor: "pointer" }}
        />
      </Container>
    )
  );
}

export default Toolbar;
