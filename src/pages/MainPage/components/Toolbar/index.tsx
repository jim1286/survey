import { useEffect, useState, useTransition } from "react";
import { Container } from "./styles";
import { IconCirclePlus } from "@tabler/icons-react";

export interface Position {
  top: number | undefined;
  bottom: number | undefined;
}

function Toolbar() {
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

  return (
    !isPending && (
      <Container position={position}>
        <IconCirclePlus />
      </Container>
    )
  );
}

export default Toolbar;
