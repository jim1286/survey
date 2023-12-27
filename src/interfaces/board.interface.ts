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
}

export interface BoardOption {
  id: string;
  label: string;
  value: string;
}
