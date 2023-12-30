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
  const renderOption = (type: BoardTypeEnum, index: number) => {
    switch (type) {
      case BoardTypeEnum.CHECKBOX_CHOICE: {
        return <Checkbox checked={false} />;
      }
      case BoardTypeEnum.MULTIPLE_CHOICE: {
        return <RoundedCheckbox checked={false} />;
      }
      case BoardTypeEnum.DROPDOWN_CHOICE: {
        return <NumberWrap>{index + 1}</NumberWrap>;
      }
    }
  };

  const renderAddOption = ((type) => {
    switch (type) {
      case BoardTypeEnum.CHECKBOX_CHOICE: {
        return <Checkbox checked={false} />;
      }
      case BoardTypeEnum.MULTIPLE_CHOICE: {
        return <RoundedCheckbox checked={false} />;
      }
      case BoardTypeEnum.DROPDOWN_CHOICE: {
        return <NumberWrap>{options && options.length + 1}</NumberWrap>;
      }
    }
  })(type);

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
          {renderOption(type, index)}
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
          {renderAddOption}
          <Input placeholder="질문 추가" onClick={onAddOption} value={""} />
        </OptionContainer>
      )}
    </Container>
  );
}

export default ChoiceComponent;
