import { ClearButton } from "..";
import { Container, OptionContainer, TypeCheckbox } from "./styles";
import { BoardOption, BoardResult } from "@/interfaces";
import { BoardTypeEnum } from "@/enums";

interface Props {
  type: BoardTypeEnum;
  showClear: boolean;
  options?: BoardOption[];
  findBoardResult?: BoardResult;
  onOption: (optionId: string) => void;
  onClearOption: () => void;
}

function ChoiceComponent({
  type,
  showClear,
  options,
  findBoardResult,
  onOption,
  onClearOption,
}: Props) {
  return (
    <Container>
      {options?.map((option) => {
        let checked = false;
        if (findBoardResult && findBoardResult.optionId === option.id) {
          checked = true;
        }

        return (
          <OptionContainer key={option.id}>
            <TypeCheckbox
              rounded={type === BoardTypeEnum.MULTIPLE_CHOICE}
              checked={checked}
              onClick={() => onOption(option.id)}
            />
            {option.value}
          </OptionContainer>
        );
      })}
      {showClear && <ClearButton onClearOption={onClearOption} />}
    </Container>
  );
}

export default ChoiceComponent;
