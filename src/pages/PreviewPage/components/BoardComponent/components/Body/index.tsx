import { BoardTypeEnum } from "@/enums";
import {
  ChoiceContainer,
  Container,
  OptionContainer,
  RoundCheckBox,
} from "./styles";
import { BoardOption } from "@/interfaces";
import { Checkbox, Input, Select } from "antd";

interface Props {
  type: BoardTypeEnum;
  options?: BoardOption[];
}

function Body({ type, options }: Props) {
  const renderOptions = ((type, options) => {
    switch (type) {
      case BoardTypeEnum.SHORT_ANSWER: {
        return (
          <Input
            placeholder="단답형 텍스트"
            style={{ width: "200px" }}
            value={""}
          />
        );
      }
      case BoardTypeEnum.LONG_ANSWER: {
        return (
          <Input
            placeholder="장문형 텍스트"
            style={{ width: "400px" }}
            value={""}
          />
        );
      }
      case BoardTypeEnum.MULTIPLE_CHOICE: {
        return (
          <ChoiceContainer>
            {options?.map((option) => (
              <OptionContainer key={option.id}>
                <RoundCheckBox checked={false} />
                {option.value}
              </OptionContainer>
            ))}
          </ChoiceContainer>
        );
      }
      case BoardTypeEnum.CHECKBOX_CHOICE: {
        return (
          <ChoiceContainer>
            {options?.map((option) => (
              <OptionContainer key={option.id}>
                <Checkbox checked={false} />
                {option.value}
              </OptionContainer>
            ))}
          </ChoiceContainer>
        );
      }
      case BoardTypeEnum.DROPDOWN_CHOICE: {
        const selectOptions = options?.map((option) => {
          return { label: option.value, value: option.value };
        });

        return (
          <ChoiceContainer>
            <Select
              style={{ width: "150px" }}
              size="large"
              options={selectOptions}
            />
          </ChoiceContainer>
        );
      }
    }
  })(type, options);

  return <Container>{renderOptions}</Container>;
}

export default Body;
