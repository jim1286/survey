import { BoardTypeEnum } from "@/enums";

export interface Board {
  id: string;
  type: BoardTypeEnum;
  necessary: boolean;
  explanation: boolean;
  explanationValue?: string;
  title?: string;
  answer?: string;
  options?: BoardOption[];
  checkedOptionId?: string;
}

export interface BoardOption {
  id: string;
  label: string;
  value: string;
}

export interface BoardResult {
  id: string;
  boardId: string;
  optionId?: string;
  answer?: string;
}
