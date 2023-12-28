import { IconSelector, IconX } from "@tabler/icons-react";
import { Checkbox, Input } from "antd";
import {
  Container,
  InputContainer,
  MoveContainer,
  NumberWrap,
  OptionContainer,
  RoundedCheckbox,
} from "./styles";
import { BoardOption } from "@/interfaces";
import { ChangeEvent } from "react";
import { BoardTypeEnum } from "@/enums";

interface Props {
  type: BoardTypeEnum;
  enteredOptionId: string;
  index?: number;
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
      {options?.map((option, index) => (
        <OptionContainer
          key={option.id}
          onMouseEnter={() => onMouseEnter(option.id)}
          onMouseLeave={onMouseLeave}
          onDragEnd={onDragEnd}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => onDragEnter(option.id)}
        >
          {enteredOptionId === option.id && isClicked && (
            <MoveContainer draggable onDragStart={() => onDragStart(option.id)}>
              <IconSelector />
            </MoveContainer>
          )}
          {type === BoardTypeEnum.CHECKBOX_CHOICE ? (
            <Checkbox checked={false} />
          ) : type === BoardTypeEnum.MULTIPLE_CHOICE ? (
            <RoundedCheckbox checked={false} />
          ) : (
            <NumberWrap>{index + 1}</NumberWrap>
          )}
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
          {type === BoardTypeEnum.CHECKBOX_CHOICE ? (
            <Checkbox checked={false} />
          ) : type === BoardTypeEnum.MULTIPLE_CHOICE ? (
            <RoundedCheckbox checked={false} />
          ) : (
            <NumberWrap>{options && options.length + 1}</NumberWrap>
          )}
          <Input placeholder="질문 추가" onClick={onAddOption} value={""} />
        </OptionContainer>
      )}
    </Container>
  );
}

export default ChoiceComponent;
