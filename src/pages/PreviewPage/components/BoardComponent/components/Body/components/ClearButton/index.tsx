import { Button } from "antd";
import { ButtonContainer } from "./styles";

interface Props {
  onClearOption: () => void;
}

function ClearButton({ onClearOption }: Props) {
  return (
    <ButtonContainer>
      <Button type="text" onClick={onClearOption} style={{ width: "100px" }}>
        선택해제
      </Button>
    </ButtonContainer>
  );
}

export default ClearButton;
