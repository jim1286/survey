import { Container, ExplanationWrap, Label, TitleWrap } from "./styles";
import { Board } from "@/interfaces";
import { Body } from "./components";

interface Props {
  board: Board;
}

function BoardComponent({ board }: Props) {
  return (
    <Container>
      <TitleWrap>
        {board.title}
        {board.necessary && <Label>*</Label>}
      </TitleWrap>
      <ExplanationWrap>{board.explanationValue}</ExplanationWrap>
      <Body type={board.type} options={board.options} />
    </Container>
  );
}

export default BoardComponent;
