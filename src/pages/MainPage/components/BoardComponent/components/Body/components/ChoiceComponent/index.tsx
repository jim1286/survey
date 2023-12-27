import { IconSelector, IconX } from "@tabler/icons-react";
import { Input } from "antd";
import {
  Container,
  InputContainer,
  MoveContainer,
  OptionContainer,
  TypeCheckbox,
} from "./styles";
import { BoardOption } from "@/interfaces";
import { ChangeEvent } from "react";
import { BoardTypeEnum } from "@/enums";

interface Props {
  type: BoardTypeEnum;
  enteredOptionId: string;
  options?: BoardOption[];
  isClicked: boolean;
  onMouseEnter: (optionId: string) => void;
  onMouseLeave: () => void;
  onDragEnd: () => void;
  onDragEnter: (optionId: string) => void;
  onDragStart: (optionId: string) => void;
  onChangeOption: (e: ChangeEvent<HTMLInputElement>, optionId: string) => void;
  onDeleteOption: (optionId: string) => void;
  onAddOption: () => void;
}

function ChoiceComponent({
  type,
  enteredOptionId,
  options,
  isClicked,
  onMouseEnter,
  onMouseLeave,
  onDragEnd,
  onDragEnter,
  onDragStart,
  onChangeOption,
  onDeleteOption,
  onAddOption,
}: Props) {
  return (
    <Container>
      {options?.map((option) => (
        <OptionContainer
          key={option.id}
          onMouseEnter={() => onMouseEnter(option.id)}
          onMouseLeave={onMouseLeave}
          onDragEnd={onDragEnd}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => onDragEnter(option.id)}
        >
          {enteredOptionId === option.id && (
            <MoveContainer draggable onDragStart={() => onDragStart(option.id)}>
              <IconSelector />
            </MoveContainer>
          )}
          <TypeCheckbox
            rounded={type === BoardTypeEnum.MULTIPLE_CHOICE}
            checked={false}
          />
          {isClicked ? (
            <InputContainer>
              <Input
                value={option.value}
                onChange={(e) => onChangeOption(e, option.id)}
              />
              {options.length !== 1 && (
                <IconX
                  style={{ cursor: "pointer" }}
                  onClick={() => onDeleteOption(option.id)}
                />
              )}
            </InputContainer>
          ) : (
            option.value
          )}
        </OptionContainer>
      ))}
      {isClicked && (
        <OptionContainer>
          <TypeCheckbox
            rounded={type === BoardTypeEnum.MULTIPLE_CHOICE}
            checked={false}
          />
          <Input placeholder="질문 추가" onClick={onAddOption} value={""} />
        </OptionContainer>
      )}
    </Container>
  );
}

export default ChoiceComponent;
